const express = require("express");
const meaningRouter = express.Router();
const meaningController = require("../../controllers/meaningController.js");

meaningRouter.get("/reading", (req, res, next) => {
    const { tarot, position, context } = req.query;
    console.log(context);
    meaningController
        .getMeaningByReading(tarot, position, context)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

meaningRouter.get("/tarot/:tarot", (req, res, next) => {
    const tarot = req.params.tarot;
    console.log(tarot);
    meaningController
        .getMeaningByTarot(tarot)
        .then((result) => res.status(200).json(result))
        .catch(next);
});

module.exports = meaningRouter;
