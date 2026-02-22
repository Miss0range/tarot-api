const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const historySchema = new Schema({
    userId: { type: ObjectId, ref:'User', required: true },
    spread: { type: String, required: true },
    tarots: [{
        title: {type: String, required: true},
        position: {type: String, enum:['upright', 'reverse'], default:'upright', required: true}
    }],
}, {timestamps: true});

const History = mongoose.model('History', historySchema);

module.exports = History;
