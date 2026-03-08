const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const userSettingSchema = new schema({
    userId: {type: objectId, ref: 'User', unique: true, required: true},
    autoStoreHistory: {type: Boolean, default: true},
    //More in the future
});

const UserSetting = mongoose.model("UserSetting", userSettingSchema);

module.exports = UserSetting;