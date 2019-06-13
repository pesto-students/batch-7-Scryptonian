import express from 'express';
import passport from 'passport';
import { clientUrl } from '../configs/config';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const {
      name, emailId, imageUrl, _id,
    } = req.user;
    res.redirect(
      `${clientUrl}/boards/userdata?name=${name}&emailId=${emailId}&imageUrl=${imageUrl}&userId=${_id}`,
    );
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(clientUrl);
});

export default router;
