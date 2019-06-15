import express from 'express';

import { OK, BAD_REQUEST } from '../configs/httpStatusCodes';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import * as util from '../util';

const router = express.Router();

// GET USER BOARD LIST
router.get('/', async (req, res, next) => {
  let boards;
  try {
    boards = await Board.find();
    return res.status(OK).send(boards);
  } catch (e) {
    return next(e.message);
  }
});

// CREATE NEW BOARD
router.post('/', async (req, res, next) => {
  const { name, lifeCycles } = req.body;
  const createdBy = req.user.id;
  const members = [
    {
      member: createdBy,
      role: 'SUPERADMIN',
    },
  ];
  const board = { name, members, createdBy };

  let savedLifecycles;
  try {
    savedLifecycles = await Lifecycle.insertMany(lifeCycles);
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
  const { boardid } = req.body;
  if (!util.isValidObjectId(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardId');
  }

  let board;
  try {
    board = await Board.findOne({ _id: boardid })
      .select('_id name lifecycles')
      .populate({ path: 'lifecycles', populate: { path: 'issues' } });
  } catch (e) {
    return next(e.message);
  }
  return res.status(OK).send(board);
});

export default router;
