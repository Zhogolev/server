var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: {type: String, index: {unique: true, dropDups: true}},
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');