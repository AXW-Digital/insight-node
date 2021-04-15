const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Profile = mongoose.model('profile');

module.exports = app => {

    app.get('/api/profile', requireLogin, async (req, res) => {

        const filter = {_user: req.user.id}
        const update = {lastLogin: Date.now()}
        const profile = await Profile.findOneAndUpdate(filter, update, {
            new: true
        });
        console.log(profile)

        if (!profile) {
            res.redirect('/profile/create')
        } else {
            res.send(profile)
        };
    });

    app.post('/api/profile/create', requireLogin, async (req, res) => {

        const {
            fName,
            sName,
            email,
            phone,
            address,
            addrNum,
            city,
            profileCreated,
            lastLogin,
            rank } = req.body;

        const newProfile = new Profile({
            fName,
            sName,
            email,
            phone,
            address,
            addrNum,
            city,
            profileCreated,
            lastLogin,
            rank,
            _user: req.user.id
        })

        await newProfile.save();
        console.log('user profile created');
        res.redirect('/home');

    });

    
    
    app.post('/api/profile/update', requireLogin, async (req, res) => {
        const {
            fName,
            sName,
            email,
            phone,
            address,
            addrNum,
            city } = req.body;
            
        var updateProfile = {
            fName,
            sName,
            email,
            phone,
            address,
            addrNum,
            city};

        var o = Object.entries(updateProfile).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

        const filter = {_user: req.user.id}
        
        updateProfile = o

        console.log(updateProfile)

        const profile = await Profile.findOneAndUpdate(filter, updateProfile, {
            new: true
        });
       
    });
};