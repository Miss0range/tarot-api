const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spreadSchema = new Schema({
    name: { type: String, required: true, unique: true },
    size: { type: Number, required: true },
    positionName: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.length === this.size;
            },
            message: "positionName length must equal size",
        },
    },
});

const Spread = mongoose.model("Spread", spreadSchema);
module.exports = Spread;
