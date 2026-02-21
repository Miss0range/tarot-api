const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spreadSchema = new Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    positionName: [{ type: String }]
});

spreadSchema.pre('save', async function(){
    if (this.positionName.length !== this.size) {
       throw new Error(`positionName length ${this.positionName.length} must equal size ${this.size}`);
    }
});

const Spread = mongoose.model("Spread", spreadSchema);
module.exports = Spread;
