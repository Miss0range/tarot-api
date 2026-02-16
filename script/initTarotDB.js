//Run only once
const Tarot = require("../models/tarot");
const fs = require("fs").promises;
// require("dotenv").config();
const db = require("../db/connection");

// const path = require("path");

const addAllTarot = async function () {
    //read from JSON file
    try {
        const tarotsRaw = await fs.readFile(
            __dirname.replace("script", "JSON\\tarots.json"),
            "utf8"
        );
        const tarots = JSON.parse(tarotsRaw);
        //clear collection first
        await Tarot.deleteMany({});
        const result = await Tarot.insertMany(tarots);
        console.log(`Added ${result.length} cards successfully`);
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
};

//run
db.once("open", () => {
    addAllTarot();
});
