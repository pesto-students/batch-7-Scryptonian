import express from 'express';
import mongoose from 'mongoose';

import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../configs/httpStatusCodes';
import { roles } from '../configs/config';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import User from '../models/user';
import Label from '../models/label';
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

// Add label to issue
router.post('/label', async (req, res) => {
  const { color, labelName, boardId } = req.body;
  const isBoardIdValid = mongoose.Types.ObjectId.isValid(boardId);
  if (!isBoardIdValid || !color || !labelName) {
    return res.status(BAD_REQUEST).send('Invalid request');
  }
  const labelDocument = { color, labelName, boardId };

  let savedLabels;
  try {
    savedLabels = await Label.create(labelDocument);
    await Board.findOneAndUpdate({ _id: boardId }, { $push: { labels: savedLabels._id } });
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).send(`Error saving new issue. ${e.message}`);
  }

  return res.send(savedLabels);
});

// Get all labels of the board
router.get('/:boardid/label', async (req, res, next) => {
  const { boardid } = req.params;
  if (!util.isValidObjectId(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardId');
  }
  let labels;
  try {
    labels = await Label.find();
  } catch (e) {
    next(e.message);
  }
  return res.status(OK).send(labels);
});

// Invite a new user to a board
router.post('/invite', userRoleCheck(roles.ADMIN), async (req, res, next) => {
  const { boardid } = req.query;
  const { invitedEmailId, invitedUserName } = req.body;

  if (!util.isValidObjectId(boardid)) {
    return res.status(BAD_REQUEST).send('Invalid boardId');
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ emailId: invitedEmailId });
  } catch (e) {
    return next(e.message);
  }

  let updatedBoard;
  if (existingUser) {
    // if user already exists
    try {
      updatedBoard = await Board.findByIdAndUpdate(
        boardid,
        {
          $push: {
            members: {
              member: existingUser._id,
              membername: existingUser.name,
              role: 'INVITED',
            },
          },
        },
        { new: true },
      );
      await User.findByIdAndUpdate(existingUser, { $push: { memberOf: boardid } });
    } catch (e) {
      return next(e.message);
    }
  } else {
    // if user is new
    const userDocument = {
      name: invitedUserName,
      emailId: invitedEmailId,
      memberOf: [boardid],
    };

    try {
      const newUser = await User.create(userDocument);
      updatedBoard = await Board.findByIdAndUpdate(
        boardid,
        {
          $push: { members: { member: newUser._id, membername: newUser.name, role: 'INVITED' } },
        },
        { new: true },
      );
    } catch (e) {
      return next(e.message);
    }
  }
  return res.status(OK).send(updatedBoard);
});

export default router;
