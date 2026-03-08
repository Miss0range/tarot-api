const mongoose = require("mongoose");
const schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const meaningSchema = new schema({
    tarotId: { type: objectId, ref: "Tarot", required: true },
    tarot: { type: String, required: true },
    context: {
        type: String,
        enum: ["general", "love", "career", "finance", "advise", "action"],
        default: "general",
        required: true,
    },
    position: {
        type: String,
        enum: ["upright", "reverse"],
        default: "upright",
    },
    meaning: { type: String, required: true },
    keyword: [{ type: String }],
});

//creater index for faster look up
meaningSchema.index({ tarot: 1, context: 1, position: 1 });

const Meaning = mongoose.model("Meaning", meaningSchema);
module.exports = Meaning;
