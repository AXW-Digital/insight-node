const mongoose = require('mongoose');
const requireLogin = require("../middlewares/requireLogin");
const keys = require('../config/keys');
const axios = require("axios");



module.exports = app => {

    app.get('/api/cards', requireLogin, async (req, res) => {

        
        axios.get(keys.adminUrl + '/api/cards')
            .then((response) => {
                data = response.data
                return res.send(200, data)
            });

    });







};