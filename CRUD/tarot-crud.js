const Tarot = require("../models/tarot");

class TarotCRUD {
    constructor(){}

    async count(query={}){
        return await Tarot.countDocuments(query);
    }

    async getById(id) {
        return await Tarot.findById(id);
    }

    async getByTitle(title) {
        return await Tarot.findOne({title});
    }

    async getRandom(query, size) {
        return await Tarot.aggregate([{$match:query}, {$sample:{size}}]);
    }

}

module.exports = new TarotCRUD();