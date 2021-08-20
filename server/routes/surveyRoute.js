const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');

module.exports = app => {

    app.get('/api/surveys/count', requireLogin, async (req, res) => {

        const filter = { _user: req.user.id };
        const selection = 'id -_id dateSent'
        const surveyAns = await Survey.find(filter).select(selection);        
        let result = surveyAns.map(a => a.id);
        let timestamp = surveyAns.map(a => a.dateSent)

        const timeDiff = (timestamp) => {
            let stamp = new Date(timestamp).getTime()
            let now = new Date(Date.now()).getTime()
            difference = Math.abs(( now - stamp ) / (1000 * 60 * 60))
            return difference
        }

        const diff = timestamp.map(timeDiff)
        const list = []
        var i;

        for (i = 0; i < diff.length; i++){
             list.push({
                 'id': result[i],
                 'diff': diff[i]
             })
        }

        result = {
            id: result,
            timestamp,
            list
        }
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