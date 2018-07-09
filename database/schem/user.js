const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelName = require('../../configs/database').users_model_name;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registrationDate: {
        type: Date,
        default: function() {
            return Date.now()
        }
    },
    isActive: {
        default:true,
        type: Boolean
    },
    role:{
        type: String,
        default: "user"
    }

}).plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model(modelName, UserSchema);