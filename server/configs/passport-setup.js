import passport from 'passport';
import Strategy from 'passport-google-oauth20';
import User from '../models/user';
import config from './config';

const GoogleStrategy = Strategy;
// After passsport callback user will be passed here were it will serialize user.id
// and pass it to cookie-session for encryption
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id) {
    User.findById(id)
      .then(existingUser => done(null, existingUser))
      .catch(err => console.log(err));
  } else {
    done(null, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: config.google.callbackURL,
      clientID: config.google.clientId,
      clientSecret: config.google.secretKey,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log('existing User');
          done(null, existingUser);
        } else {
          new User({
            name: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    },
  ),
);
