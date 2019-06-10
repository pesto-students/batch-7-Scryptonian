import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import users from './routes/users';
import boards from './routes/boards';

import { PORT, MONGO_CONNECTION_STRING } from './configs/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users/', users);
app.use('/boards/', boards);

app.get('/', (req, res) => {
  res.send('Hey!');
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });
    console.log('Established connection with MongoDB.');
    await app.listen(PORT);
    console.log(`Server started at port ${PORT}`);
  } catch (err) {
    throw new Error(err);
  }
}

startServer();
