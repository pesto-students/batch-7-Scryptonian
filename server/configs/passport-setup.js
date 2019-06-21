import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user';
import { google } from './config';

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
        existingUser = await User.findOne({ emailId: profile.emails[0].value });
        if (existingUser) {
          if (existingUser.googleId) {
            done(null, existingUser);
          }
          newUser = await User.findByIdAndUpdate(
            existingUser._id,
            {
              name: profile.displayName,
              googleId: profile.id,
              imageUrl: Object.is(profile.photos[0], undefined) ? null : profile.photos[0].value,
              emailId: Object.is(profile.emails[0], undefined) ? null : profile.emails[0].value,
            },
            { new: true },
          );
          done(null, newUser);
        } else {
          newUser = await new User({
            name: profile.displayName,
            googleId: profile.id,
            imageUrl: Object.is(profile.photos[0], undefined) ? null : profile.photos[0].value,
            emailId: Object.is(profile.emails[0], undefined) ? null : profile.emails[0].value,
          }).save();
          done(null, newUser);
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },
  ),
);
