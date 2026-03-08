const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const historySchema = new Schema(
    {
        userId: { type: objectId, ref: "User", required: true },
        spread: { type: String, required: true },
        tarots: [
            {
                tarotId: {type: objectId, ref: "Tarot", required: true},
                title: { type: String, required: true },
                position: {
                    type: String,
                    enum: ["upright", "reverse"],
                    default: "upright",
                    required: true,
                },
                spreadPosition: { type: String },
            },
        ],
    },
    { timestamps: true, versionKey: false },
);

historySchema.index({ userId: 1, createdAt: -1 });
historySchema.index({ userId: 1, spread: 1, createdAt: -1 });

const History = mongoose.model("History", historySchema);

module.exports = History;
