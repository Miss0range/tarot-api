const tarotCRUD = require("../CRUD/tarot-crud");
const spreadCRUD = require("../CRUD/spread-crud");

const { AppError, ErrorType } = require("../utility/AppError");

const utility = require("../utility/utility");

const AcceptableQuestions = Object.freeze([
    "love",
    "career",
    "finances",
    "feelings",
    "actions",
    "yesno",
]);

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
        const spread = await spreadCRUD.getSpreadByName(spreadName);
        if (!spread) {
            throw new AppError(
                `Spread ${spreadName} not found`,
                ErrorType.RESOURCE_NOT_FOUND,
            );
        }
        const positioned = await this.#getTarots(
            spread.size,
            majorOnly,
            allowReverse,
        );
        //add spreadPosition to result
        const result = positioned.map((tarot, index) => ({
            id: tarot.id,
            title: tarot.title,
            position: tarot.position,
            spreadPosition: spread.positionName[index],
        }));
        return result;
    }

    //support custom spread reading
    async getCustomSpreadReading(positionName, majorOnly = false, allowReverse = true) {
        const positioned = await this.#getTarots(
            positionName.length,
            majorOnly,
            allowReverse,
        );
        //add spreadPosition to result
         const result = positioned.map((tarot, index) => ({
            id: tarot.id,
            title: tarot.title,
            position: tarot.position,
            spreadPosition: positionName[index],
        }));
        return result;
    }

    //TODO: Don't put this into end point for copyright concern
    async getRandomCardsWithMeaning(
        size,
        majorOnly = false,
        allowReverse = true,
        question = "general",
    ) {
        const positioned = await this.#getTarots(size, majorOnly, allowReverse);
        const formattedQuestion = AcceptableQuestions.includes(question)
            ? question
            : "general";
        const results = positioned.map((tarot) => ({
            id: tarot.id,
            title: tarot.title,
            position: tarot.position,
            meaning: tarot.meaning[tarot.position][formattedQuestion],
        }));
        return results;
    }
}

module.exports = new ReadController();
