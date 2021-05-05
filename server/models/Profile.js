const mongoose = require('mongoose');
const { Schema } = mongoose;

const geomSchema = new Schema({
    lat: mongoose.Decimal128,
    lng: mongoose.Decimal128
});

const profileSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
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
    coupons: Number,
    level: Number,
    points: Number    
});

mongoose.model('profile', profileSchema);