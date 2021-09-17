const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {      
      res.redirect('/home');
    }
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook')
  );

  app.get(
    '/auth/facebook/callback', 
    passport.authenticate('facebook'),
    (req, res) => {      
      res.redirect('/home');
    }
  );
    


  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // test to see if the oauth works with the current user
  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });
};
