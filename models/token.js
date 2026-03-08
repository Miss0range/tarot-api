const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const tokenSchema = new schema({
    userId: { type: objectId, ref: "User", required: true},
    type: { type: String, enum: ["email_verify", "password_reset", "email_change", "invite"], required: true},
    token: {type: String, required: true, unique: true},
    expiresAt: {type: Date, required: true},
    newEmail: {type: String} //optional, use to overwrite user email after verification
});

tokenSchema.index({expiresAt: 1}, {expireAfterSeconds : 0});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
