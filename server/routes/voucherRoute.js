const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/vouchers/user/:userId', requireLogin, async (req, res) => {

        const userId = req.params.userId;
        var data = null
        console.log('voucherRoute using id: ' + userId)
        await axios.get(keys.adminUrl + "/api/vouchers/user/" + userId)
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });


    app.get('/api/vouchers/reg/all', requireLogin, async (req, res) => {

        await axios.get(keys.adminUrl + '/api/vouchers/reg/all')
        .then((response) => {
            data = response.data
            return res.send(200, data)
        })
        .catch(err => {
            console.log(err)
        })


    })


    app.post('/api/vouchers', requireLogin, async (req, res) => {

        const userId = req.user.id;
        
        console.log(req.user)

        const {
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name
          } = req.body;

        const data = {
            userId,
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name
        }

        console.log('sending following data to voucher backend: ', data)


        await axios.post(keys.adminUrl + '/api/vouchers', data).then(
            response => {
                console.log(response.status)
                res.send(response.status)
            }
        )
            


    });




};
