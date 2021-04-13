const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');

module.exports = app => {
    app.post('/api/surveys', requireLogin, (req, res) => {

        console.log(req);

        // const { id,
        //         tyyppi,
        //         kyselyTitle,
        //         kysymykset} = req.body;
        
        // const survey = new Survey({
        //     id,
        //     tyyppi,
        //     kyselyTitle,
        //     kysymykset,
        //     _user: req.user.id,
        //     dateSent: Date.now(),
        //     responded: true
        // });
    });
};