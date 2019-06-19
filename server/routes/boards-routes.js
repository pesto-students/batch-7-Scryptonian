import express from 'express';

import { OK, BAD_REQUEST } from '../configs/httpStatusCodes';
import { roles } from '../configs/config';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import User from '../models/user';
import userRoleCheck from '../middlewares/userRoleCheck';
import * as util from '../util';

const router = express.Router();

// Get list of boards for a particular user
router.get('/', async (req, res, next) => {
  const userid = '5cfe8d55b9d4e349154c4517'; // Remove this hardcoded value after cors issue resolve
  let boards;
  try {
    boards = await Board.find({ 'members.member': userid })
      .populate({ path: 'createdBy' })
      .exec();
    const boardFilter = boards.filter((board) => {
      const newBoard = board.members.filter(el => el.member === userid);
      return newBoard;
    });
    return res.status(OK).send(boardFilter);
  } catch (e) {
    return next(e.message);
  }
});

// Create a new board
router.post('/', async (req, res, next) => {
  const { name, lifecycles } = req.body;
  const createdBy = '5cfe8d55b9d4e349154c4517'; // Remove this hardcoded value after cors issue resolve

  let userDetails;
  try {
    userDetails = await User.findById(createdBy);
  } catch (e) {
    return next(e.message);
  }
  const members = [
    {
      member: createdBy,
      membername: userDetails.name,
      role: 'SUPERADMIN',
    },
  ];
  const board = { name, members, createdBy };

  let savedLifecycles;
  try {
    savedLifecycles = await Lifecycle.insertMany(lifecycles);
  } catch (e) {
    return next(e.message);
  }

  const lifecycleReferences = savedLifecycles.map(lifecycle => lifecycle._id);
  const modifiedBoard = {
    ...board,
    lifecycles: lifecycleReferences,
  };

  let savedBoard;
  try {
    savedBoard = await Board.create(modifiedBoard);
  } catch (e) {
    return next(e.message);
  }
  return res.status(OK).send(savedBoard);
});

// Delete a board
router.delete('/', userRoleCheck(roles.SUPERADMIN), async (req, res, next) => {
  const { boardid } = req.query;

  try {
    Board.findByIdAndRemove(boardid).exec();
  } catch (e) {
    return next(e.message);
  }

  return res.status(OK).send();
});

// Get board detailed data for Kanban Layout display
router.get('/kanban', async (req, res, next) => {
  const { boardid } = req.query;
  if (!util.isValidObjectId(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardId');
  }

  let board;
  try {
    board = await Board.findOne({ _id: boardid }).populate({
      path: 'lifecycles',
      populate: { path: 'issues', populate: { path: 'assignee' } },
    });
  } catch (e) {
    return next(e.message);
  }
  return res.status(OK).send(board);
});

export default router;
