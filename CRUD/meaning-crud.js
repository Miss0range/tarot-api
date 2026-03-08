const Meaning = require("../models/meaning");

class MeaningCRUD {
    async getMeaningById(id) {
        return await Meaning.findById(id);
    }

    async getMeaningsByTarots(tarots, context = "general") {
        const conditions = tarots.map(tarot => ({
            tarotId: tarot._id,
            position: tarot.position,
            context,
        }))

        const meanings = await Meaning.find({$or: conditions});
        return meanings;
    }

    async getMeaningsByTarotId(tarotId) {
        return await Meaning.find({tarotId});
    }
}

module.exports = new MeaningCRUD();
