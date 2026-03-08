const tarotCRUD = require("../CRUD/tarot-crud");
const { AppError, ErrorType } = require("../utility/appError");

class TarotController {
    constructor() {}

    async getTarotByTitle(title) {
        const tarot = await tarotCRUD.getTarotByTitle(title);
        if (!tarot) {
            throw new AppError(
                `Tarot ${title} not found`,
                ErrorType.RESOURCE_NOT_FOUND,
                "Tarot Controller - getTarotByTitle",
            );
        }
        return tarot;
    }
}

module.exports = new TarotController();
