import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user';
import { google } from './config';

// After passport callback user will be passed here were it will serialize user.id
// and pass it to cookie-session for encryption
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let existingUser;
  try {
    if (id) {
      existingUser = await User.findById(id);
      if (existingUser.ok) {
        done(null, existingUser);
      }
    }
    done(null, null);
  } catch (e) {
    throw new Error(e.message);
  }
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: google.callbackUrl,
      clientID: google.clientId,
      clientSecret: google.secretKey,
    },
    async (accessToken, refreshToken, profile, done) => {
      let existingUser;
      let newUser;
      try {
        existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          newUser = await new User({
            name: profile.displayName,
            googleId: profile.id,
          }).save();
          done(null, newUser);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },
  ),
);
