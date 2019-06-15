import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './configs/passport-setup';

import users from './routes/users';
import boards from './routes/boards-routes';
import issues from './routes/issues';
import router from './routes/auth-routes';

import { PORT, MONGO_CONNECTION_STRING, session } from './configs/config';
import { INTERNAL_SERVER_ERROR } from './configs/httpStatusCodes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(
  cookieSession({
    maxAge: session.maxAge,
    keys: session.keys,
  }),
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', router);
app.use('/users/', users);
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
app.use((err, req, res, next) => {
  res.status(INTERNAL_SERVER_ERROR).send(`Something went wrong! ${err}`);
});

export const db = mongoose.connection;
