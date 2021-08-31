const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/faq', async (req, res) => {

        
        axios.get(keys.localUrl + '/api/faq')
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });







};