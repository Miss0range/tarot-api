const tarotCRUD = require('../CRUD/tarot-crud');

class TarotController {
    constructor() {}

    async getByTitle(title) {
        try {
            const tarot = await tarotCRUD.getByTitle(title);
            if (tarot) return { status: 200, payload: tarot };
            else
                return {
                    status: 404,
                    payload: {
                        message: `card ${title.replace("-", " ")} not found`,
                    },
                };
        } catch (error) {
            console.error(error);
            return { status: 500, payload: { message: error.message } };
        }
    }
}

module.exports = new TarotController();