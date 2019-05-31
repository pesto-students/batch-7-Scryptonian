import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../configs/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.status(200).send('Server');
});

module.exports = app;
