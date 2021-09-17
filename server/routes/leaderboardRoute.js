const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model('survey');
const Profile = mongoose.model('profile')

module.exports = app => {

    app.get('/api/data/activity', requireLogin, async (req, res) => {

        const surveyAns = await Survey.find()
        const profiles = await Profile.find()
        const data = {surveys: surveyAns, profiles}



        return res.status(200).send(data)


    }) 


}