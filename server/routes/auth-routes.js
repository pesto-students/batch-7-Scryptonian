import express from 'express';
import passport from 'passport';
import querystring from 'querystring';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send('login');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const userData = req.user;
    res.redirect(`http://localhost:3000/userdata?${querystring.stringify(userData)}`);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
