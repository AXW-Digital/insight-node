const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const checkProfile = require("../middlewares/checkProfile");
const keys = require('../config/keys');
const axios = require('axios');
const _ = require('lodash');

const Profile = mongoose.model('profile');
const User = mongoose.model('users')

var ObjectId = require('mongoose').Types.ObjectId;

var throt_fun = _.throttle(function (profile, filter) {
    if (profile !== null) { console.log(profile.fName, Date(Date.now())) } else { console.log('user ' + filter._user + ' needs to update profile') }
}, 5000, { 'trailing': true });

module.exports = app => {

    app.get('/api/profile', requireLogin, async (req, res) => {

        const filter = { _user: req.user.id }
        const update = { lastLogin: Date.now() }
        const profile = await Profile.findOneAndUpdate(filter, update, {
            new: true
        });
        res.status(200).send(profile)
        // Calling throttle() method with its parameter
        

        // throt_fun(profile, filter);





    });

    app.post('/api/profile/create', requireLogin, async (req, res) => {

        const avatarSeed = 'dfgsgcdgrew'

        const {
            uName,
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city,
            profileCreated,
            lastLogin,
            rank
        } = req.body;

        const newProfile = new Profile({
            uName,
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city,
            profileCreated,
            lastLogin,
            rank,
            _user: req.user.id,
            level: 1,
            points: 0,
            goldCoupons: 0,
            silverCoupons: 0,
            bronzeCoupons: 0,
            avatarSeed
        })

        const coupons = {
            goldCoupons: 0,
            silverCoupons: 0,
            bronzeCoupons: 0,
            userId: req.user.id
        }

        await newProfile.save();

        await axios.post(keys.localUrl + '/api/coupons', coupons).then(
            (resp) => {
                // console.log(resp.status)
                res.sendStatus(resp.status)

            }
        ).catch(err => {
            console.log(err)
        })

        // console.log('user profile created');


    });


    app.post('/api/profile/update', requireLogin, async (req, res) => {


        const {
            uName,
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city } = req.body;

        var updateProfile = {
            uName,
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city
        };

        var o = Object.entries(updateProfile).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
        updateProfile = o


        const filter = { _user: req.user.id }
        const profile = await Profile.findOneAndUpdate(filter, updateProfile, {
            new: true
        });

        res.end('profile updated succesfully');



    });


    app.post('/api/profile/points', requireLogin, async (req, res) => {
        var { points } = req.body;
        const filter = { _user: req.user.id }

        const currentPoints = await Profile.findOne(filter)
        // console.log('current points:')
        // console.log(currentPoints.points)

        if (currentPoints.points === undefined) currentPoints.points = 0

        points += currentPoints.points
        const updatePoints = { points }

        const profile = await Profile.findOneAndUpdate(filter, updatePoints, {
            new: true
        });

        return res.sendStatus(200)
    })


    app.post('/api/profile/coupons', requireLogin, async (req, res) => {
        var { goldCoupons, silverCoupons, bronzeCoupons } = req.body;
        const userId = req.user.id

        const coupons = {
            goldCoupons,
            silverCoupons,
            bronzeCoupons,
            userId
        }

        await axios.post(keys.localUrl + '/api/coupons', coupons).then(
            response => {
                // console.log(response.status)
                res.sendStatus(response.status)
            }
        )
    })


    app.get('/api/coupons', requireLogin, async (req, res) => {
        const userId = req.user.id

        await axios.get(keys.localUrl + '/api/coupons/' + userId).then(
            (response) => {

                const {
                    goldCoupons,
                    silverCoupons,
                    bronzeCoupons
                } = response.data[0]

                const data = {
                    goldCoupons,
                    silverCoupons,
                    bronzeCoupons
                }

                res.status(200).send(data)
            }
        ).catch(err => {
            console.log(err)
        })



    })


    app.post('/api/coupons', requireLogin, async (req, res) => {



        await axios.post(keys.localUrl + '/api/coupons', req.body).then(
            (resp) => {
                // console.log('coupons sent: ', req.body)
                // console.log(resp.status)
                res.sendStatus(resp.status)

            }
        ).catch(err => {
            console.log(err)
        })



    })

    app.post('/api/profile/avatar', requireLogin, async (req, res) => {


        const {
            _user,
            avatarSeed
        } = req.body


        const filter = {
            _user
        }

        const updateProfile = {
            avatarSeed
        }

        const profile = await Profile.findOneAndUpdate(filter, updateProfile, {
            new: true
        });

        // console.log('updated avatar', filter, updateProfile)

        res.status(200).send('profile avatar updated succesfully');


    })

    app.get('/api/profile/delete', requireLogin, async (req, res) => {

        const pFilter = { _user: req.user.id }
        const uFilter = { _id: req.user.id }
        // console.log(req.user.id)

        const confirm = req.query.confirm
        if (confirm) {
            console.log('deleting account')
            await Profile.findOneAndDelete(pFilter, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Deleted Profile : ", docs);
                }
            })
            await User.findOneAndDelete(uFilter, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Deleted User : ", docs);
                }
            })
        }

        res.status(200).send('profile removed successfully')



    })



};