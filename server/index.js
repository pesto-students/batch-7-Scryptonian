import express from 'express';
import users from './routes/users';
import boards from './routes/boards';

const app = express();
const port = process.env.PORT || 3000;

app.use('/users/', users);
app.use('/boards/', boards);

app.get('/', (req, res) => {
    res.send('Hey!');
})

app.listen(port);