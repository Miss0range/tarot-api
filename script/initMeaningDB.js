const tarotCrud = require("../CRUD/tarot-crud");
const Meaning = require("../models/meaning");
const db = require("../db/connection");
const fs = require("fs").promises;
const path = require('path');

(() => {
    db.once("open", async () => {
        try {
            const jsonPath = path.join(__dirname, "..", "data", "meaning.json");
            const rawMeanings = await fs.readFile(jsonPath);
            const meanings = JSON.parse(rawMeanings);
            await Meaning.deleteMany({});
            for (let meaning of meanings) {
                const tarot = await tarotCrud.getByTitle(meaning.tarot);
                const res = await Meaning.insertOne({
                    ...meaning,
                    tarotId: tarot._id,
                });
                console.log(res);
            }
        } catch (error) {
            console.error(error);
        } finally {
            db.close();
            process.exit(0);
        }
    });
})();
