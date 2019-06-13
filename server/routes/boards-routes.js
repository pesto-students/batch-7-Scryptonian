import express from 'express';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import { OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../configs/http-status-code';

const router = express.Router();

// GET USER BOARD LIST
router.get('/', async (req, res) => {
  let boards;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.status(200).send('Working');
  // if (req.isAuthenticated()) {
  //   try {
  //     boards = await Board.find();
  //     res.status(200).send(boards);
  //   } catch (e) {
  //     res.status(500).send(`Internal Server Error ${e}`);
  //   }
  // } else {
  //   res.status(UNAUTHORIZED).send('Unauthorized Access');
  // }
});
// CREATE NEW BOARD
router.post('/', async (req, res) => {
  console.log(req.user.id, 'POST req id');
  return res.status(OK).send('Unauthorized Access');
  //   if (req.isAuthenticated()) {
  //     const { name, lifeCycles } = req.body;
  //     const createdBy = req.user.id;
  //     const members = [
  //       {
  //         member: createdBy,
  //         role: 'SUPERADMIN',
  //       },
  //     ];
  //     const board = { name, members, createdBy };

  //     let savedLifecycles;
  //     try {
  //       savedLifecycles = await Lifecycle.insertMany(lifeCycles);
  //     } catch (e) {
  //       return res.status(INTERNAL_SERVER_ERROR).send(`Error saving lifecycles ${e.message}`);
  //     }

  //     const lifecycleReferences = savedLifecycles.map(lifecycle => lifecycle._id);
  //     const modifiedBoard = {
  //       ...board,
  //       lifecycles: lifecycleReferences,
  //     };

  //     let savedBoard;
  //     try {
  //       savedBoard = await Board.create(modifiedBoard);
  //     } catch (e) {
  //       return res.status(INTERNAL_SERVER_ERROR).send(`Error saving board ${e.message}`);
  //     }

  //     return res.status(OK).send(savedBoard);
  //   }
  //   return res.status(INTERNAL_SERVER_ERROR).send('Something went wrong');
  // });

  // // GET BOARD DETAILS BY ID
  // router.get('/:boardId', async (req, res) => {
  //   if (req.isAuthenticated()) {
  //     const { boardId } = req.query;
  //     let boards;
  //     try {
  //       boards = await Board.find({ _id: boardId });
  //       res.status(OK).send(boards);
  //     } catch (e) {
  //       return res.status(INTERNAL_SERVER_ERROR).send(`Internal Server Error ${e}`);
  //     }
  //   }
});

// router.get(':boardId/issues', re);

module.exports = router;
