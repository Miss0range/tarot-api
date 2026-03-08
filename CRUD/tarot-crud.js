const Tarot = require("../models/tarot");

class TarotCRUD {
    constructor() {}

    async count(query = {}) {
        return await Tarot.countDocuments(query);
    }

    async getById(id) {
        return await Tarot.findById(id);
    }

    async getByTitle(title) {
        return await Tarot.findOne({ title });
    }

    async getRandom(query, size) {
        return await Tarot.aggregate([
            { $match: query },
            { $sample: { size: size * 2 } }, // oversample to account for dupes
            { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $limit: size },
        ]);
    }
}

module.exports = new TarotCRUD();
