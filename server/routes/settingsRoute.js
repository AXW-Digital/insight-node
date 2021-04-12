const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Settings = mongoose.model('settings');

module.exports = app => {
    app.post('/api/settings', requireLogin, (req, res) => {
        const {
            maxdist,
            maxprice,
            emailTest,
            emailSurvey,
            emailNews } = req.body;

        const settings = new Settings({
            maxdist,
            maxprice,
            emailTest,
            emailSurvey,
            emailNews,
            _user: req.user.id
        });
    });
};