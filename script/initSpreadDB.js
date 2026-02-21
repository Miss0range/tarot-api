const Spread = require("../models/spread");
const db = require("../db/connection");
const fs = require("fs").promises;
const path = require("path");

const addSpread = async () => {
    try {
        const jsonPath = path.join(__dirname, "..", "data", "spread.json");
        const spreadsRaw = await fs.readFile(jsonPath, "utf8");
        const spreads = JSON.parse(spreadsRaw);

        await Spread.deleteMany({});
        const spreadsCreated = await Spread.insertMany(spreads);
        console.log("spreads created : ", spreadsCreated);
    } catch (error) {
        console.error(error);
    } finally {
        db.close();
        process.exit(0);
    }
};

db.once("open", addSpread);
