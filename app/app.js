const express = require('express');
const app = express();
const readRouter = require('./routes/read');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/tarot', readRouter);

module.exports = app;