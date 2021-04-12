const mongoose = require('mongoose');
const { Schema } = mongoose;

const settingsSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    maxdist: Number,
    maxprice: Number,
    emailTest: { type: Boolean, default: false},
    emailSurvey:{ type: Boolean, default: false},
    emailNews: { type: Boolean, default: false}
});

mongoose.model('settings', settingsSchema);