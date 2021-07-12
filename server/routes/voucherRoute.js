const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/vouchers/user/:userId', requireLogin, async (req, res) => {

        const userId = req.params.userId;
        var data = null
        console.log('voucherRoute using id: ' + userId)
        axios.get(keys.adminUrl + "/api/vouchers/user/" + userId)
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });




};