import express from 'express';

const router = express.Router();

router.get('', (req, res) => {
  res.send('Hey from GET users/');
});

export default router;