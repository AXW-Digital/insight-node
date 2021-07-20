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


    app.get('/api/vouchers/reg/all', requireLogin, async (req, res) => {

        axios.get(keys.adminUrl + '/api/vouchers/reg/all')
        .then((response) => {
            data = response.data
            return res.send(200, data)
        })
        .catch(err => {
            console.log(err)
        })


    })


    app.post('/api/vouchers', requireLogin, async (req, res) => {

        const userId = req.params.userId;
        const data = req.body;

        axios.post(keys.adminUrl + '/api/vouchers', data)
            .then((response) => {
                vouchers = response.data
                return res.send(200, data)
            })


    });




};