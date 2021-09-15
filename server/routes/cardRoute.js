const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/cards', requireLogin, async (req, res) => {

        
        axios.get(keys.localUrl + '/api/cards')
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });


    app.get('/api/cards/social/:id', async (req, res) => {

        const id = req.params.id
        console.log(id)


        axios.get(keys.localUrl + '/api/cards/social/' + id)
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });

    app.get('/api/boosts', async (req, res) => {

        await axios.get(keys.localUrl + '/api/boosts').then((response) => {
            data = response.data
            return res.send(200, data)
        });
    });








};