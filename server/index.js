import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import './configs/passport-setup';

import invite from './routes/invite-routes';
import users from './routes/users';
import boards from './routes/boards-routes';
import issues from './routes/issues-routes';
import router from './routes/auth-routes';

import { PORT, MONGO_CONNECTION_STRING } from './configs/config';
import { INTERNAL_SERVER_ERROR } from './configs/httpStatusCodes';
import { checkToken, verifyToken } from './middlewares/authService';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/invite/', invite);
app.use('/auth', router);
app.use('/users/', users);
app.use(checkToken);
app.use(verifyToken);
app.use('/boards/', boards);
app.use('/issues/', issues);

export const server = app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server started at port ${PORT}.`);
});

(async function startServer() {
  console.log('Starting server.');
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.error(e);
    server.close(() => console.log('Server stopped.'));
  }
}());

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => res.status(INTERNAL_SERVER_ERROR).send(`Something went wrong! ${err}`));

export const db = mongoose.connection;
