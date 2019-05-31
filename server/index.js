import express from 'express';
import users from './routes/users';
import boards from './routes/boards';

import { PORT } from './configs/config';

const app = express();

app.use('/users/', users);
app.use('/boards/', boards);

app.get('/', (req, res) => {
  res.send('Hey!');
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
