const historyCRUD = require("../CRUD/history-crud");
const userSettingCRUD = require("../CRUD/userSetting-crud");
const { toZonedTime, fromZonedTime } = require("date-fns-tz");
const { AppError, ErrorType } = require("../utility/appError");

class HistoryController {
    async createHistoryAuto(userId, spread, tarots, timezone = "UTC") {
        const isAutoSaveEnabled =
            await userSettingCRUD.isAutoSaveHistoryEnabled(userId);
        if (isAutoSaveEnabled) {
            await this.createHistory(userId, spread, tarots, timezone);
        }
        return;
    }

    async createHistory(userId, spread, tarots, timezone = "UTC") {
        if (!spread || !tarots || !tarots.length) {
            throw new AppError(
                "Invalid spread or tarots",
                ErrorType.INVALID_INPUT,
                "History Controller - createHistory"
            );
        }
        //add check limit
        if (spread === "daily") {
            return await this.createDailyHistory(
                userId,
                spread,
                tarots,
                timezone,
            );
        } else {
            return await historyCRUD.createHistory(userId, spread, tarots);
        }
    }

    async createDailyHistory(userId, spread, tarots, timezone) {
        // Get current time in user's timezone
        const now = toZonedTime(new Date(), timezone);

        // Set start and end of day in their local time
        const startOfDayLocal = new Date(now);
        startOfDayLocal.setHours(0, 0, 0, 0);

        const endOfDayLocal = new Date(now);
        endOfDayLocal.setHours(23, 59, 59, 999);

        // Convert back to UTC for MongoDB query
        const startOfDay = fromZonedTime(startOfDayLocal, timezone);
        const endOfDay = fromZonedTime(endOfDayLocal, timezone);
        const historyToday = await historyCRUD.getHistoryByUserIdAndDateRange(
            userId,
            startOfDay,
            endOfDay,
            spread,
        );
        if (historyToday.length) return;
        else return await historyCRUD.createHistory(userId, spread, tarots);
    }

    //Get all history. Avoid using this unless super necessary
    async getUserHistory(userId) {
        return await historyCRUD.getHistoryByUserId(userId);
    }
}

module.exports = new HistoryController();
