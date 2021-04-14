const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');

module.exports = app => {
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

        if (!surveyExists) {
            await survey.save();
            console.log('survey saved');
        } else {
            await Survey.findOneAndUpdate(filter, updateSurvey, {
                new: true
            });
            console.log('survey updated');           
        }

    });

};