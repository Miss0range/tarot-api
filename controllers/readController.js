const tarotCRUD = require("../CRUD/tarot-crud");
const { AppError, ErrorType } = require("../utility/AppError");
const utility = require("../utility/utility");

class ReadController {
    async #getTarots(size, majorOnly = false, allowReverse = true) {
        const query = majorOnly ? { category: "major arcana" } : {};
        const count = await tarotCRUD.count(query);
        if (size > count)
            throw new AppError(
                `Size requested ${size} exceed collection size`,
                ErrorType.SIZE_EXCEEDED,
            );
        const tarots = await tarotCRUD.getRandom(query, size);
        if (!tarots) {
            throw new AppError(
                `failed to find tarots. please contact api creator for db integrity`,
            );
        }
        const positioned = allowReverse
            ? utility.assignPosition(tarots)
            : tarots.map((tarot) => ({
                  ...tarot,
                  position: "upright",
              }));
        return positioned;
    }

    //Support get numbers of random cards
    async getRandomCards(size, majorOnly = false, allowReverse = true) {
        const positioned = await this.#getTarots(size, majorOnly, allowReverse);
        const results = positioned.map((tarot) => ({
            id: tarot.id,
            title: tarot.title,
            position: tarot.position,
        }));
        return results;
    }

    //Support get a reading of specific spread
    async getSpreadReading(spreadName, majorOnly = false, allowReverse = true) {
        //Todo
    }

    //TODO: Don't put this into end point for copyright concern
    async getRandomCardsWithMeaning(
        size,
        majorOnly = false,
        allowReverse = true,
        question = "general",
    ) {
        const positioned = await this.#getTarots(size, majorOnly, allowReverse);
        //Todo: add enum for accpetable question error handle invalid question : like what for lunch
        const results = positioned.map((tarot) => ({
            id: tarot.id,
            title: tarot.title,
            position: tarot.position,
            meaning: tarot.meaning[tarot.position][question],
        }));
        return results;
    }
}

module.exports = new ReadController();
