const passport = require("passport");
var request = require("request");
const axios = require("axios");
const mongoose = require("mongoose");
const { session } = require("passport");
const User = mongoose.model("users");
const verifyAppleToken = require("verify-apple-id-token").default;
const appleSignin = require("apple-signin-auth");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log(req.user._id, "logged in at ", Date(Date.now()));
      res.redirect("/home");
    }
  );

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      console.log(req.user._id, "logged in at ", Date(Date.now()));
      res.redirect("/home");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // test to see if the oauth works with the current user
  app.get("/api/current_user", (req, res) => {
    res.status(200).send(req.user);
  });

  app.post(
    "/auth/google/token",
    passport.authenticate("google-oauth-token"),
    async (req, res) => {
      const { expo_token } = req.query;
      const expoToken = expo_token;
      const filter = req.user._doc;
      const id = req.user._id;

      const update = {
        ...filter,
        expoToken,
      };

      await User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true, strict: false }
      );
      res.send(req.user ? 200 : 401);
    }
  );

  app.post(
    "/auth/facebook/token",
    passport.authenticate("passport-facebook-token"),
    async (req, res) => {
      const { expo_token } = req.query;
      const expoToken = expo_token;
      const filter = req.user._doc;
      const id = req.user._id;

      const update = {
        ...filter,
        expoToken,
      };

      await User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true, strict: false }
      );
      res.send(req.user ? 200 : 401);
    }
  );

  app.post(
    "/auth/apple/token",
    passport.authenticate("apple-strategy"),
    async (req, res) => {
      const { expo_token } = req.query;
      const expoToken = expo_token;
      const filter = req.user._doc;
      const id = req.user._id;

      const update = {
        ...filter,
        expoToken,
      };

      await User.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true, strict: false }
      );
      res.send(req.user ? 200 : 401);
    }
  );
};
