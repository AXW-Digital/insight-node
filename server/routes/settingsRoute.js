const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Settings = mongoose.model('settings');

module.exports = app => {

    app.get('/api/settings', requireLogin, async (req, res) => {

        const settings = await Settings.findOne({ _user: req.user.id })
        console.log(settings)
        const intialSettings = new Settings({
            maxdist: 50,
            maxprice: 15,
            emailTest: false,
            emailSurvey: false,
            emailNews: false,
            _user: req.user.id
        })

        if (!settings) {
            await intialSettings.save()
            console.log('settings initialized');
            res.send(settings)
        } else {
            res.send(settings)
        };
    });
    

    app.post('/api/settings/update', requireLogin, async (req, res) => {
        const {
            maxdist,
            maxprice,
            emailTest,
            emailSurvey,
            emailNews } = req.body;

        var updateSettings = {
            maxdist,
            maxprice,
            emailTest,
            emailSurvey,
            emailNews,
            _user: req.user.id
        };

        updateSettings = Object.entries(updateSettings).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const filter = {_user: req.user.id}

        const settings = await Settings.findOneAndUpdate(filter, updateSettings, {
            new: true
        });

        res.send('Settings updated succesfully!')

    });
};