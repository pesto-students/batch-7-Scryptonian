import express from 'express';
import mongoose from 'mongoose';

import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../configs/httpStatusCodes';
import Board from '../models/board';

const router = express.Router();

router.get('/kanban', async (req, res) => {
  const { boardid } = req.body;
  if (!mongoose.Types.ObjectId.isValid(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardID');
  }

  let board;
  try {
    board = await Board.findOne({ _id: boardid })
      .select('_id name lifecycles')
      .populate({ path: 'lifecycles', populate: { path: 'issues' } });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error fetching data from DB ${e.message}`);
  }
  return res.status(OK).send(board);
});

export default router;
