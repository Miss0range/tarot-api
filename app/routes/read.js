const express = require("express");
const readRouter = express.Router();
const tarotController = require("../../controllers/readController");
const historyController = require("../../controllers/historyController");

readRouter.get("/random/:size", (req, res, next) => {
    const size = parseInt(req.params.size);
    const majorOnly = req.query.majorOnly === "true";
    const allowReverse = req.query.allowReverse !== "false";
    if (isNaN(size)) {
        return res
            .status(400)
            .json({
                message: "Number of tarots requested must be integer",
            });
    }
    if (size <= 0) {
        return res
            .status(400)
            .json({
                message: "Number of tarots requested must be non-zero positive integer",
        });
    }
    tarotController
        .getRandomTarots(size, majorOnly, allowReverse)
        .then((result) => {
            if (req.user && req.user.emailVerified) {
                historyController
                    .createHistoryAuto(req.user.id, `random_${size}`, result)
                    .catch((error) =>
                        console.error("Failed to save history", error),
                    );
            }
            res.status(200).json({
                spread: `random_${size}`,
                tarots: result,
            });
        })
        .catch(next);
});

readRouter.post("/spread/custom", (req, res, next) => {
    const majorOnly = req.query.majorOnly === "true";
    const allowReverse = req.query.allowReverse !== "false";
    const positionName = req.body.positionName;
    if (!positionName || !Array.isArray(positionName) || !positionName.length) {
        return res
            .status(400)
            .json({
                message:
                    "Custom spread position name need to be an non empty array",
            });
    }
    tarotController
        .getCustomSpreadReading(positionName, majorOnly, allowReverse)
        .then((result) => {
            if (req.user && req.user.emailVerified) {
                historyController
                    .createHistoryAuto(req.user.id, "custom-spread", result)
                    .catch((error) =>
                        console.error("Failed to save history", error),
                    );
            }
            res.status(200).json({
                spread: "custom-spread",
                tarots: result,
            });
        })
        .catch(next);
});

readRouter.get("/spread/:spreadName", (req, res, next) => {
    const majorOnly = req.query.majorOnly === "true";
    const allowReverse = req.query.allowReverse !== "false";
    const spread = req.params.spreadName;
    tarotController
        .getSpreadReading(spread, majorOnly, allowReverse)
        .then((result) => {
            if (req.user && req.user.emailVerified) {
                const timezone = req.headers["x-timezone"];
                const validTimezone = Intl.supportedValuesOf(
                    "timeZone",
                ).includes(timezone)
                    ? timezone
                    : "UTC";
                historyController
                    .createHistoryAuto(
                        req.user.id,
                        spread,
                        result,
                        validTimezone,
                    )
                    .catch((error) =>
                        console.error("Failed to save history", error),
                    );
            }
            res.status(200).json({
                spread,
                tarots: result,
            });
        })
        .catch(next);
});

module.exports = readRouter;
