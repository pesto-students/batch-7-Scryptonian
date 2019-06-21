import jwt from 'jsonwebtoken';
import { session } from '../configs/config';

export const checkTokenMW = (req, res, next) => {
  console.log('checktoken');
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  } else {
    res.sendStatus(403);
  }
};

export const createToken = (req, res) => {
  jwt.sign({ userId: req.user._id }, session.keys[0], (err, token) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json({ token });
    }
  });
};

export const verifyToken = (req, res, next) => {
  console.log('verifytoken', req.token);
  jwt.verify(req.token, session.keys[0], (err, authData) => {
    console.log(authData, 'authData');
    if (err) {
      res.sendStatus(403);
    } else {
      req.authData = authData;
      next();
    }
  });
};
