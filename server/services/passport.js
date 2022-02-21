const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleOauthTokenStrategy = require("passport-google-oauth-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });

      if (existingUser) {
        console.log("found fb user: ", profile.id);
        return done(null, existingUser);
      } else {
        console.log("found no fb user, creating new one: ", profile.id);
        const user = await new User({
          facebookId: profile.id.toString(),
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new GoogleOauthTokenStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      fbGraphVersion: "v3.0",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });

      if (existingUser) {
        console.log("found fb user: ", profile.id);
        return done(null, existingUser);
      } else {
        console.log("found no fb user, creating new one: ", profile.id);
        const user = await new User({
          facebookId: profile.id.toString(),
        }).save();
        done(null, user);
      }
    }
  )
);
