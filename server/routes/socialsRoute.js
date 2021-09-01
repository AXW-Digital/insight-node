const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");
const Profile = mongoose.model('profile');
const Survey = mongoose.model('survey');



module.exports = app => {

    app.get('/api/socials/all', async (req, res) => {

        
        await axios.get(keys.localUrl + '/api/socials/all')
            .then((response) => {
                data = response.data
                return res.status(200).send(data)
            });

    });

    
    app.get('/api/socials/:userId', requireLogin, async (req, res) => {

        const userId = req.params.userId


        
        await axios.get(keys.localUrl + '/api/socials/' + userId)
            .then((response) => {
                data = response.data
                return res.status(200).send(data)
            });

    });


};