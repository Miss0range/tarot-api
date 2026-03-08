const express = require('express');
const app = express();
const cors = require('cors');

const readRouter = require('./routes/read');
const tarotRouter = require('./routes/tarot');
const meaningRouter = require('./routes/meaning');

app.use(cors());
app.use(express.json());

app.use('/read', readRouter);
app.use('/tarot', tarotRouter);
app.use('/meaning', meaningRouter)

app.use((error, _req, res, _next)=>{
    console.error(error);
    res.status(error.type?.status ?? 500).json({
        message: error.message,
        code: error.type?.code ?? 'INTERNAL_ERROR'
    });
})

module.exports = app;