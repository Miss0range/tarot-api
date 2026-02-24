const History = require('../models/history');

class HistoryCRUD{

    async createHistory(userId, spread, tarots) {
        return await History.create({userId, spread, tarots});
    }

    async getHistoryById(historyId) {
        return await History.findById(historyId);
    }

    async getHistoryByUserId(userId) {
        return await History.find({userId});
    }

    async deleteHistoryById(historyId) {
        return await History.findByIdAndDelete(historyId);
    }

    async deleteHistoryByUserId(userId) {
        return await History.deleteMany({userId});
    }

}

module.exports = new HistoryCRUD();