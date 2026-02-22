const express = require("express");
const readRouter = express.Router();
const tarotController = require("../../controllers/readController");
const { AppError, ErrorType } = require("../../utility/AppError");

readRouter.get("/random/:size", (req, res, next) => {
    const size = parseInt(req.params.size);
    const majorOnly = req.query.majorOnly === "true";
    const allowReverse = req.query.allowReverse !== "false";
    if (isNaN(size)) {
        return next(
            new AppError(
                "Number of tarots requested must be valid integer",
                ErrorType.INVALID_INPUT,
            ),
        );
    }
    tarotController
        .getRandomCards(size, majorOnly, allowReverse)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

readRouter.get("/spread/:spreadName", (req, res, next) => {
    const majorOnly = req.query.majorOnly === "true";
    const allowReverse = req.query.allowReverse !== "false";
    if (req.params.spreadName === "custom") {
        const positionName = req.body.positionName;
        if (!Array.isArray(positionName) || positionName.length < 1) {
            return next(
                new AppError(
                    "custom spread position name need to be an non empty array",
                    ErrorType.INVALID_INPUT,
                ),
            );
        }
        tarotController
            .getCustomSpreadReading(positionName, majorOnly, allowReverse)
            .then((result) => res.status(200).json(result))
            .catch(next);
    } else {
        tarotController
            .getSpreadReading(req.params.spreadName, majorOnly, allowReverse)
            .then((result) => res.status(200).json(result))
            .catch(next);
    }
});

module.exports = readRouter;
