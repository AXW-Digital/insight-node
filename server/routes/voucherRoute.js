const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/vouchers/user/:userId', requireLogin, async (req, res) => {

        const userId = req.params.userId;
        var data = null
        // console.log('voucherRoute using id: ' + userId)
        await axios.get(keys.localUrl + "/api/vouchers/user/" + userId)
            .then((response) => {
                data = response.data
                return res.status(200).send(data)
            });

    });


    app.get('/api/vouchers/reg/all', requireLogin, async (req, res) => {

        await axios.get(keys.localUrl + '/api/vouchers/reg/all')
        .then((response) => {
            data = response.data
            return res.status(200).send(data)
        })
        .catch(err => {
            console.log(err)
        })


    })


    app.post('/api/vouchers', requireLogin, async (req, res) => {

        // console.log('body: ', req.body)

        const {
            userId,
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name,
            qrCode
          } = req.body;

        const data = {
            userId,
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name,
            qrCode
        }

        // console.log('sending following data to voucher backend: ', data)


        await axios.post(keys.localUrl + '/api/vouchers', data).then(
            response => {
                // console.log(response.status)
                res.sendStatus(response.status)
            }
        ) .catch(err => {
            console.log(err)
        })
            


    });

    app.post('/api/vouchers/reg/redeem', requireLogin, async (req, res) => {
    
        await axios.post(keys.localUrl + '/api/vouchers/reg/redeem', req.body).then(
            response => {
                // console.log('sending voucher data to reg: ', req.body)
                // console.log(response.status)
                if(res.status === 200){
                    res.sendStatus(200)
                }
                
            }
        ).catch(err => {
            console.log(err)
        })

        // return res.status(200).send(200, 'successfully used voucher')
    
    });

    app.post('/api/vouchers/reg', requireLogin, async (req, res) => {


        const {
            userId,
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name,
            qrCode
          } = req.body

        
        const data = {
            userId,
            voucherId,
            partnerId,
            benefitValue,
            benefitType,
            name,
            qrCode
        }


    
        await axios.post(keys.localUrl + '/api/vouchers/reg', data).then(
            response => {
                // console.log('sending voucher data to reg: ', data)
                // console.log(response.status)
                res.sendStatus(response.status)
            }
        ).catch(err => {
            console.log(err)
        })

        // return res.status(200).send(200, 'successfully used voucher')
    
    });





};
