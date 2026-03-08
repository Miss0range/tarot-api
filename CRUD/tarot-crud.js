const Tarot = require("../models/tarot");

class TarotCRUD {
    constructor() {}

    async count(query = {}) {
        return await Tarot.countDocuments(query);
    }

    async getTarotById(id) {
        return await Tarot.findById(id);
    }

    async getTarotByTitle(title) {
        return await Tarot.findOne({ title });
    }

    async getRandomTarots(query, size) {
        return await Tarot.aggregate([
            { $match: query },
            { $sample: { size: size * 2 } }, // $sample can return dupes, oversample then dedup
            { $group: { _id: "$_id", doc: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $limit: size },
        ]);
    }
    
    //TODO
    // In your tarot CRUD when adding an image
    // const exists = tarot.images.some(img => img.deck === newDeck);
    // if (exists) throw new AppError("Deck already exists", ErrorType.INVALID_INPUT, source);
}

module.exports = new TarotCRUD();
