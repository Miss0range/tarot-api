const Spread = require('../models/spread');

class SpreadCRUD {
    constructor(){}

    async getSpreadByName(name) {
        return await Spread.findOne({name});
    }

    async createNewSpread(newSpread) {
        return await Spread.insertOne(newSpread);
    }

}

module.exports = new SpreadCRUD();