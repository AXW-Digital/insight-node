const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveysSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    responded: { type: Boolean, default: false},
    dateSent: Date,
    id: String,
    kyselyTitle: String,
    formData: [Schema.Types.Mixed]
}, {strict: false});

module.exports = mongoose.model('survey', surveysSchema);