import mongoose from 'mongoose';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, FORBIDDEN } from '../configs/httpStatusCodes';
import { roles } from '../configs/config';

import Board from '../models/board';

export default function userRoleCheck(requiredRole) {
  return async (req, res, next) => {
    const { boardid } = req.query;
    const userid = '5cfe8d55b9d4e349154c4517'; // TODO: Remove this when CORS issue is resolved

    const isBoardIdValid = mongoose.Types.ObjectId.isValid(boardid);
    if (!isBoardIdValid) {
      return res.status(BAD_REQUEST).send('Invalid boardid');
    }

    let board;
    try {
      board = await Board.findById(boardid)
        .select('members')
        .lean()
        .exec();
    } catch (e) {
      res.status(INTERNAL_SERVER_ERROR).send(`Error checking User Role. ${e.message}`);
    }

    const userRoleInBoard = board.members.find(member => member.member.toString() === userid).role;
    const roleId = roles[userRoleInBoard];
    if (roleId >= requiredRole) {
      return next();
    }
    return res.status(FORBIDDEN).send('You are not authorized to perform this action');
  };
}
