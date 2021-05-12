const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const checkProfile = require("../middlewares/checkProfile");

const Profile = mongoose.model('profile');

module.exports = app => {

    app.get('/api/profile', requireLogin, async (req, res) => {

        const filter = {_user: req.user.id}
        const update = {lastLogin: Date.now()}
        const profile = await Profile.findOneAndUpdate(filter, update, {
            new: true
        });
        
        console.log(profile.fName, Date(Date.now()))
        res.send(profile)

        
    });

    app.post('/api/profile/create', requireLogin, async (req, res) => {

        const {
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
            coupons: 0
        })

        await newProfile.save();
        console.log('user profile created');
        return res.status(200).end('profile created');
        

    });
    
    
    app.post('/api/profile/update', requireLogin, async (req, res) => {
        const {
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city } = req.body;

        var updateProfile = {
            fName,
            sName,
            email,
            phone,
            address,
            geom,
            city};

        var o = Object.entries(updateProfile).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})        
        updateProfile = o


        const filter = {_user: req.user.id}
        const profile = await Profile.findOneAndUpdate(filter, updateProfile, {
            new: true
        });

        res.end('profile updated succesfully');

         
       
    });


    app.post('/api/profile/points', requireLogin, async (req, res) => {
        var { points } = req.body;
        const filter = {_user: req.user.id}
        
        const currentPoints = await Profile.findOne(filter)
        console.log('current points:')
        console.log(currentPoints.points)

        if (currentPoints.points === undefined) currentPoints.points = 0
        
        points += currentPoints.points
        const updatePoints = { points }       
        
        const profile = await Profile.findOneAndUpdate(filter, updatePoints, {
            new: true
        });

        return res.send(200) 
    }) 
};