const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");

const Profile = mongoose.model('profile');

module.exports = app => {

    app.get('/api/profile', requireLogin, async (req, res) => {

        const profile = await Profile.findOne({ _user: req.user.id })
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

    
    
    app.post('/api/profile/update', requireLogin, (req, res) => {
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

        const updateProfile = new Profile({
            fName,
            sName,
            email,
            phone,
            address,
            addrNum,
            city,
            profileCreated,
            lastLogin,
        });
    });
};