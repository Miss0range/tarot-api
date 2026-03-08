const Meaning = require("../models/meaning");

class MeaningCRUD {
    async getMeaningByID(id) {
        return await Meaning.findById(id);
    }

    async getMeaningByReading(tarot, position, context) {
        return await Meaning.findOne({
            tarot,
            position,
            context,
        }).populate("tarotId");
    }

    async getMeaningByTarot(tarot) {
        return await Meaning.find({ tarot });
    }
}

module.exports = new MeaningCRUD();
