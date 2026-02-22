const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tier: {type:String, enum: ['admin', 'paid', 'free'], default:'free', required: true},
    isActive: {type:Boolean, default: true}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;