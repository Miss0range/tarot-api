const express = require('express');
const app = express();
const readRouter = require('./routes/read');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/tarot', readRouter);

app.use((error, _req, res, _next)=>{
    console.error(error);
    res.status(error.type?.status ?? 500).json({
        message: error.message,
        code: error.type?.code ?? 'INTERNAL_ERROR'
    });
})

module.exports = app;