const express = require("express");
const meaningRouter = express.Router();
const meaningController = require("../../controllers/meaningController.js");

meaningRouter.post("/reading", (req, res, next) => {
    const readings = req.body["reading"];
    const context = req.body["context"];
    if (!readings || !readings.tarots || !readings.tarots.length) {
        return res.status(400).json({
            message: "reading(s) required",
        });
    }
    meaningController
        .getMeaningsByReadings(readings, context)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

meaningRouter.get("/tarot/:tarotTitle", (req, res, next) => {
    const tarotTitle = req.params.tarotTitle;
    meaningController
        .getMeaningsByTarotTitle(tarotTitle)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

module.exports = meaningRouter;
