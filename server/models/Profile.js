const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    fName: String,
    sName: String,
    email: String,
    phone: String,
    address: String,
    addrNum: Number,
    city: String,
    profileCreated: Date,
    lastLogin: Date,
    rank: String,
    coupons: Number,
    level: Number,
    points: Number
    
});

mongoose.model('profile', profileSchema);