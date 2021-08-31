const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");
const Profile = mongoose.model('profile');
const Survey = mongoose.model('survey');



module.exports = app => {

    app.get('/api/faq', async (req, res) => {

        
        axios.get(keys.localUrl + '/api/faq')
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });

    app.get('/api/aggregates', async (req, res) => {

        const filter = { _user: req.user.id };
        const selection = 'id -_id dateSent'
        const surveyAns = await Survey.find(filter).select(selection);
        const profile = await Profile.findOne(filter)        
        
        
        const surveyCount = surveyAns.length
        const points = profile.points
        const profileAge = Math.round( ( Date.now() - profile.profileCreated ) / ( 60 * 60 * 1000 * 24 ) )

        var vouchers = await axios.get( keys.localUrl + '/api/vouchers/user/' + req.user.id)
        vouchers = vouchers.data

        var totalVouchers = vouchers.map(x  => {return {benefitValue: x.benefitValue, benefitType: x.benefitType}})

        var totalBenefits = totalVouchers.filter(x => x.benefitType === 'Lahjakortti')
        totalBenefits = totalBenefits.map(x => x.benefitValue)
        totalBenefits = totalBenefits.reduce((a, b) => a + b, 0)



        const aggregateData = {
            totalSurveys: surveyCount,
            totalPoints: points,
            profileAge,
            totalBenefits
        }

        res.send(200, aggregateData)

        console.log(surveyCount)

    });







};