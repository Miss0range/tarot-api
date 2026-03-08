const meaningCRUD = require("../CRUD/meaning-crud");
const tarotCRUD = require("../CRUD/tarot-crud");
const { AppError, ErrorType } = require("../utility/appError");

class MeaningController {
    async getMeaningsByReadings(readings, context) {
        //TODO: maybe in future will expand meanings to tarot + position + spread position. Not for now. Too much data.
        let results = await meaningCRUD.getMeaningsByTarots(
            readings.tarots,
            context,
        );
        if (!results || !results.length)
            throw new AppError(
                `No meaning found for reading`,
                ErrorType.RESOURCE_NOT_FOUND,
                "Meaning Controller - getMeaningsByReadings",
            );
        return results;
    }

    async getMeaningsByTarotTitle(tarotTitle) {
        let tarot = await tarotCRUD.getTarotByTitle(tarotTitle);
        if (!tarot) {
            throw new AppError(
                `Tarot ${tarotTitle} not found`,
                ErrorType.RESOURCE_NOT_FOUND,
                "Meaning Controller - getMeaningsByTarotTitle",
            );
        }
        let results = await meaningCRUD.getMeaningsByTarotId(tarot._id);
        if (!results || !results.length)
            throw new AppError(
                `No meanings found for tarot: ${tarotTitle}`,
                ErrorType.RESOURCE_NOT_FOUND,
                "Meaning Controller - getMeaningsByTarotTitle",
            );
        return results;
    }
}

module.exports = new MeaningController();
