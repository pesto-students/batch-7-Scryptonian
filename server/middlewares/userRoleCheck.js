import mongoose from 'mongoose';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_FOUND,
} from '../configs/httpStatusCodes';
import { roles } from '../configs/config';

import Board from '../models/board';

export default function userRoleCheck(requiredRole) {
  return async (req, res, next) => {
    const { boardid } = req.query;
    const { userid } = req;

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

    let userRoleInBoard;
    try {
      userRoleInBoard = board.members.find(member => member.member.toString() === userid).role;
    } catch (e) {
      return res.status(NOT_FOUND).send('You are not a member of this board');
    }

    const roleId = roles[userRoleInBoard];
    if (roleId >= requiredRole) {
      return next();
    }
    return res.status(FORBIDDEN).send('You are not authorized to perform this action');
  };
}
