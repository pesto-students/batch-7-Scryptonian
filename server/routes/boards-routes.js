import express from 'express';

import { OK, BAD_REQUEST } from '../configs/httpStatusCodes';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import * as util from '../util';

const router = express.Router();

// GET USER BOARD LIST
router.get('/', async (req, res, next) => {
  const userid = '5cf82d981ae5553b30afa856'; // Remove this hardcoded value after cors issue resolve
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

// CREATE NEW BOARD
router.post('/', async (req, res, next) => {
  const { name, lifecycles } = req.body;
  const createdBy = '5cf82d981ae5553b30afa856'; // Remove this hardcoded value after cors issue resolve
  const members = [
    {
      member: createdBy,
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

router.get('/kanban', async (req, res, next) => {
  const { boardid } = req.query;
  if (!util.isValidObjectId(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardId');
  }

  let board;
  try {
    board = await Board.findOne({ _id: boardid })
      .select('_id name lifecycles')
      .populate({
        path: 'lifecycles',
        populate: { path: 'issues', populate: { path: 'assignee' } },
      });
  } catch (e) {
    return next(e.message);
  }
  return res.status(OK).send(board);
});

export default router;
