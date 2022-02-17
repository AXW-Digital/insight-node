const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");
const Profile = mongoose.model('profile');
const Survey = mongoose.model('survey');
const async = require('async');



module.exports = app => {

    app.get('/api/faq', async (req, res) => {


        axios.get(keys.localUrl + '/api/faq')
            .then((response) => {
                data = response.data
                return res.status(200).send(data)
            });

    });

    app.get('/api/aggregates', requireLogin, async (req, res) => {

        const filter = { _user: req.user.id };
        const selection = 'id -_id dateSent'
        const surveyAns = await Survey.find(filter).select(selection)
        const profile = await Profile.findOne(filter)

        if (profile !== null && surveyAns !== null) {
            const surveyCount = surveyAns.length
            const points = profile.points
            const profileAge = Math.round((Date.now() - profile.profileCreated) / (60 * 60 * 1000 * 24))

            var vouchers = await axios.get(keys.localUrl + '/api/vouchers/user/' + req.user.id)
            vouchers = vouchers.data

            var totalVouchers = vouchers.map(x => { return { benefitValue: x.benefitValue, benefitType: x.benefitType } })

            var totalBenefits = totalVouchers.filter(x => x.benefitType === 'Lahjakortti')
            totalBenefits = totalBenefits.map(x => x.benefitValue)
            totalBenefits = totalBenefits.reduce((a, b) => a + b, 0)



            const aggregateData = {
                totalSurveys: surveyCount,
                totalPoints: points,
                profileAge,
                totalBenefits
            }

            res.status(200).send(aggregateData)

            // console.log(surveyCount)
        } else {
            res.status(200).send('You need to login to continue')
        }




    });


    app.get('/api/rouletteitems', async (req, res) => {


        axios.get(keys.localUrl + '/api/rouletteitems')
            .then((response) => {
                data = response.data
                return res.status(200).send(data)
            });

    });

    
};