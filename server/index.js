import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import users from './routes/users';
import boards from './routes/boards';
import issues from './routes/issues';

import { PORT, MONGO_CONNECTION_STRING } from './configs/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users/', users);
app.use('/boards/', boards);
app.use('/issues/', issues);

app.get('/', (req, res) => {
  res.send('Hey!');
});

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

export const db = mongoose.connection;
