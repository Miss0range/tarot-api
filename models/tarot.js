const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tarotSchema = new schema({
    title: { type: String, required: true, unique: true },
    number: { type: Number, required: true, min: 0, max: 21 },
    suit: {
        type: String,
        enum: ["major arcana", "pentacles", "wands", "cups", "swords"],
        required: true,
    },
    images: [
        {
            deck: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
});

const Tarot = mongoose.model("Tarot", tarotSchema);
module.exports = Tarot;
