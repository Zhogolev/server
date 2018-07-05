var mongoose = require('mongoose');
var LinkSchema = new mongoose.Schema({
    url: { type: String, index: { unique: true, dropDups: true } },
    start: String,
    expiration: String
});
mongoose.model('Link', LinkSchema);

module.exports = mongoose.model('Link');