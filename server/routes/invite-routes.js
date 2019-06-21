import express from 'express';
import Board from '../models/board';

const router = express.Router();

router.get('/:boardid/:userid', async (req, res) => {
  const { boardid, userid } = req.params;

  await Board.update(
    { _id: boardid, 'members.member': userid },
    { $set: { 'members.$.role': 'USER' } },
  );

  res.redirect('https://issuetracker-scryptonians.netlify.com/');
});

export default router;