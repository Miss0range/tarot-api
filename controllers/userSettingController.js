const userSettingCRUD = require("../CRUD/userSetting-crud");

class UserSettingController {
    async getUserSetting(userId) {
        return await userSettingCRUD.getUserSetting(userId);
    }

    async updateSaveHistorySetting(userId, newAutoStoreHistoryValue) {
        return await userSettingCRUD.setAutoSave(userId, newAutoStoreHistoryValue);
    }
}

module.exports = new UserSettingController();
