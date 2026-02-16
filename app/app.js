const express = require('express');
const app = express();
const tarotRouter = require('./routes/tarot');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/tarot', tarotRouter);

module.exports = app;