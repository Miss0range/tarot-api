const express = require("express");
const userSettingRouter = express.Router();

const userSettingController = require("../../controllers/userSettingController");

userSettingRouter.post(
    "/update/autoStoreHistory",
    (req, res, next) => {
        const userId = req.user.id;
        const autoStoreHistory = req.body.autoStoreHistory;
        if (typeof autoStoreHistory !== "boolean") {
            return res.status(400).json({
                message: "autoStoreHistory value must be boolean",
            });
        }
        userSettingController
            .updateSaveHistorySetting(userId, autoStoreHistory)
            .then((newSetting) => res.status(200).json({autoStoreHistory: newSetting.autoStoreHistory}))
            .catch(next);
    },
);

userSettingRouter.get("/", (req, res, next) => {
    const userId = req.user.id;
    userSettingController
        .getUserSetting(userId)
        //Add more settings return here in the future
        .then((setting) => res.status(200).json({autoStoreHistory: setting.autoStoreHistory}))
        .catch(next);
});

module.exports = userSettingRouter;
