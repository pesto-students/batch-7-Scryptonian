import express from 'express';
import passport from 'passport';

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
    const { name, emailId, imageUrl } = req.user;
    res.redirect(
      `http://localhost:3000/boards/userdata?name=${name}&emailId=${emailId}&imageUrl=${imageUrl}`,
    );
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  console.log(res);
  res.redirect('http://localhost:3000');
});

module.exports = router;
