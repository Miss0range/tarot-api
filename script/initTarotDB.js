//Run only once
const Tarot = require("../models/tarot");
const fs = require("fs").promises;
const path = require("path");
const db = require("../db/connection");

const addAllTarot = async function () {
    //read from JSON file
    try {
        const jsonPath = path.join(__dirname, "..", "data", "tarots.json");
        const tarotsRaw = await fs.readFile(jsonPath, "utf8");
        const tarots = JSON.parse(tarotsRaw);
        //clear collection first
        await Tarot.deleteMany({});
        const result = await Tarot.insertMany(tarots);
        console.log(`Added ${result.length} cards successfully`);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        db.close();
        process.exit(0);
    }
};

//run
db.once("open", () => {
    addAllTarot();
});
