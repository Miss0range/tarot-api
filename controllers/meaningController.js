const meaningCRUD = require('../CRUD/meaning-crud');
const { AppError, ErrorType } = require("../utility/appError");

class MeaningController {
    async getMeaningByReading(tarot, position, context = "general") {
        let result = await meaningCRUD.getMeaningByReading(tarot, position,context);
        if (!result) throw new AppError(`No meaning found for ${tarot} ${position} : ${context}`, ErrorType.RESOURCE_NOT_FOUND);
        return result;
    }

    async getMeaningByTarot(tarot) {
        let results = await meaningCRUD.getMeaningByTarot(tarot);
        if (!results || !results.length) throw new AppError(`No meanings found for ${tarot}`, ErrorType.RESOURCE_NOT_FOUND);
        return results;
    }

}

module.exports = new MeaningController();