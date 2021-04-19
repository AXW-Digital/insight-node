const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');

module.exports = app => {

    app.get('/api/surveys/count', requireLogin, async (req, res) => {

        const filter = { _user: req.user.id };
        const selection = 'id -_id'
        const surveyAns = await Survey.find(filter).select(selection);        
        let result = surveyAns.map(a => a.id);
        return res.send(200, result)


    }) 


    app.post('/api/surveys', requireLogin, async (req, res) => {

        const {
            id,
            responded,
            dateSent,
            kyselyTitle,
            formData
        } = req.body;

        const survey = new Survey({
            id,
            kyselyTitle,
            _user: req.user.id,
            responded,
            dateSent,
            formData
        });

        const updateSurvey = {
            dateSent,
            formData
        };

        const filter = { id: id, _user: req.user.id };
        const surveyExists = await Survey.findOne(filter);
        var redir = {redirect: '/home'};

        if (!surveyExists) {
            await survey.save();
            console.log('survey saved');
            return res.send(200, redir);
        } else {
            await Survey.findOneAndUpdate(filter, updateSurvey, {
                new: true
            });
            console.log('survey updated');
            return res.send(200, redir);          
        }

    });

};