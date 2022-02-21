const passport = require("passport");
var request = require("request");
const axios = require("axios");

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
    (req, res) => {
      console.log(req.user)
      // do something with req.user
      res.send(req.user ? 200 : 401);
    }
  );

  app.post(
    "/auth/facebook/token",
    passport.authenticate("passport-facebook-token"),
    (req, res) => {
      console.log(req.body)
      // do something with req.user
      res.send(req.user ? 200 : 401);
    }
  );


//   app.get("/auth/google/token", async (req, res) => {
//     const uri = `/auth/google/token?${req.query.access_token}`    
//   }).then((response) => {
//     await axios.post(uri).then(
//       res.status(200)
//     )
// });;



};
