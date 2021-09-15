const requireLogin = require("../middlewares/requireLogin")

module.exports = app => {
// test to see if the oauth works with the current user
  app.get('/api/status', (req, res) => {
    res.status(200).send('server is running')
});
}