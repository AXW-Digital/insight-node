const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');

module.exports = app => {
    app.post('/api/surveys', (req, res) => {

        console.log(req.body);
        res.send('Thanks!')
        res.redirect('/home')
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