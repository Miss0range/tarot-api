const History = require('../models/history');

class HistoryCRUD{

    async createHistory(userId, spread, tarots) {
        return await History.create({userId, spread, tarots:tarots.map(({_id, ...rest})=> ({...rest, tarotId: _id}))});
    }

    async getHistoryById(historyId) {
        return await History.findById(historyId);
    }

    async getHistoryByUserId(userId) {
        //try to avoid using this
        return await History.find({userId});
    }

    async getHistoryByUserIdAndDateRange(userId, start, end, spread = "") {
        return await History.find({
            userId,
            createdAt: {$gte:start, $lte:end},
            ...(spread && { spread })
        });
    }


    async deleteHistoryById(historyId) {
        return await History.findByIdAndDelete(historyId);
    }

    async deleteHistoryByUserId(userId) {
        return await History.deleteMany({userId});
    }

}

module.exports = new HistoryCRUD();