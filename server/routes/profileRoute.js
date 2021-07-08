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
        
        if (profile !== null) {console.log(profile.fName, Date(Date.now()))} else {console.log('user ' + filter._user + ' needs to update profile') }
        res.send(profile)

        
    });

    app.post('/api/profile/create', requireLogin, async (req, res) => {

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
            bronzeCoupons: 0
        })

        await newProfile.save();
        console.log('user profile created');
        return res.status(200).end('profile created');
        

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


    app.post('/api/profile/coupons', requireLogin, async (req, res) => {
        var { goldCoupons, silverCoupons, bronzeCoupons } = req.body;
        const filter = {_user: req.user.id}
        
        const current = await Profile.findOne(filter)


        if (current.goldCoupons === undefined) current.goldCoupons = 0
        if (current.silverCoupons === undefined) current.silverCoupons = 0
        if (current.bronzeCoupons === undefined) current.bronzeCoupons = 0
        
        goldCoupons += current.goldCoupons
        silverCoupons += current.silverCoupons
        bronzeCoupons += current.bronzeCoupons


        if (current.goldCoupons < 0 ) goldCoupons = 0
        if (current.silverCoupons < 0 ) silverCoupons = 0
        if (current.bronzeCoupons < 0 ) bronzeCoupons = 0

        const updatePoints = { goldCoupons, silverCoupons, bronzeCoupons }       
        
        const profile = await Profile.findOneAndUpdate(filter, updatePoints, {
            new: true
        });

        return res.send(200) 
    }) 


    
};