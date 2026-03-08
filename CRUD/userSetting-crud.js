const UserSetting = require("../models/userSetting");

class UserSettingCRUD {
    async createDefaultUserSetting(userId) {
        return await UserSetting.create({ userId });
    }

    async getUserSetting(userId) {
        return await UserSetting.findOne({userId});
    }

    async isAutoSaveHistoryEnabled(userId) {
        let setting = await this.getUserSetting(userId);
        if (!setting) {
            setting = await this.createDefaultUserSetting(userId);
        }
        return setting.autoStoreHistory;
    }

    //Auto save user readings
    async setAutoSave(userId, enabled) {
        return await UserSetting.findOneAndUpdate(
            {userId},
            { autoStoreHistory: enabled },
            { new: true, runValidators: true },
        );
    }
}

module.exports = new UserSettingCRUD();
