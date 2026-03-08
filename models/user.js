const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Roles} = require("../utility/role");

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum:Object.values(Roles), default: Roles.USER},
    plan: {type:String, enum: ['premium', 'free'], default:'free'},
    isActive: {type:Boolean, default: true},
    emailVerified: {type: Boolean, default: false}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;