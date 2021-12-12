const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    facebookId: String,
    googleId: String,
    name: String
});

mongoose.model('users', userSchema);