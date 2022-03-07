const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    appleId: String,
    facebookId: String,
    googleId: String,
    name: String
});

mongoose.model('users', userSchema);