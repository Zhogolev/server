const mongoose = require('mongoose');
const modelName = require('../../configs/database').links_model_name;

const Schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        default: new Date(Date.now()).setHours(0,0,0,0)
    },
    expiration: {
        type: Date,
        default:  new Date(Date.now()).setHours(23,59,59,999)
    },
    isActive: {
        type: Boolean,
        default: true
    }

}).index({
    url: 1, owner: 1, start: 1, expiration: 1
}, {
    unique: true
});

module.exports = mongoose.model(modelName, Schema);