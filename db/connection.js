const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({path:path.join(__dirname, "../.env")});

const {DB_URI, DB_PW} = process.env;
const CONNECTION_URI = DB_URI.replace("<db_password>", DB_PW);


mongoose.connect(CONNECTION_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error('MongoDB connection error', err));

const db = mongoose.connection;

module.exports = db;