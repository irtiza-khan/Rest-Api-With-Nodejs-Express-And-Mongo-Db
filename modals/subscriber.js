const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Subcriber = mongoose.model('Subcriber', subscribersSchema);
module.exports = Subcriber;