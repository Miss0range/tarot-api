const tarotCRUD = require("../CRUD/tarot-crud");
const { AppError, ErrorType } = require("../utility/appError");

class TarotController {
    constructor() {}

    async getByTitle(title) {
        const tarot = await tarotCRUD.getByTitle(title);
        if (tarot) {
            return { status: 200, payload: tarot };
        } else {
            throw new AppError(
                `Tarot ${title} not found`,
                ErrorType.RESOURCE_NOT_FOUND,
            );
        }
    }
}

module.exports = new TarotController();
