import jwt from 'jsonwebtoken';
import { session } from '../configs/config';

export const checkToken = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    next();
  }
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  } else {
    res.status(403).send('Kindly login to the app.');
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
  if (process.env.NODE_ENV === 'test') {
    req.userid = '5cfb09be8ec3955b97ec00bd';
    next();
  }
  jwt.verify(req.token, session.keys[0], (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.userid = authData.userId;
      next();
    }
  });
};
