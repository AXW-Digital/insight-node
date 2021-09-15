const mongoose = require('mongoose');
const { Schema } = mongoose;

const geomSchema = new Schema({
    lat: mongoose.Decimal128,
    lng: mongoose.Decimal128
});

const profileSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    uName: String,
    fName: String,
    sName: String,
    email: String,
    phone: String,
    address: String,
    geom: [geomSchema],
    city: String,
    profileCreated: Date,
    lastLogin: Date,
    rank: String,
    goldCoupons: Number,
    silverCoupons: Number,
    bronzeCoupons: Number,
    level: Number,
    points: Number,
    avatarSeed: String    
});

mongoose.model('profile', profileSchema);