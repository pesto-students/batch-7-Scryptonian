import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { clientUrl, session } from '../configs/config';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login');
});

router.get(
  '/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const {
      name, emailId, imageUrl, _id,
    } = req.user;
    jwt.sign({ userId: req.user._id }, session.keys[0], (err, token) => {
      res.setHeader('X-token', token);
      res.redirect(
        `${clientUrl}/boards/userdata?name=${name}&emailId=${emailId}&imageUrl=${imageUrl}&userId=${_id}&token=${token}`,
      );
    });
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(clientUrl);
});

export default router;
