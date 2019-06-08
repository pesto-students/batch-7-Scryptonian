import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import users from './routes/users';
import boards from './routes/boards-routes';
import config from './configs/config';
import router from './routes/auth-routes';
import passportSetup from './configs/passport-setup';
// remove after linking react view

const app = express();

app.use(
  cookieSession({
    maxAge: config.session.maxAge,
    keys: config.session.keys,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', router);

// Connect Database
mongoose.connect(config.mongo.connectionString, { useNewUrlParser: true }, (err) => {
  console.log(err);
});

// Signup start
app.get('/', (req, res) => {
  res.status(200).send();
});

// function isLoggedIn(req, res, next) {
//   if (req.session.user !== undefined) {
//     next();
//   } else {
//     res.redirect(`${config.redirectUrlAfterLogin}`);
//   }
// }
// Signup end

app.use('/users/', users);
app.use('/boards/', boards);

app.listen(config.PORT, () => console.log(`Server started at port ${config.PORT}`));
