const express = require('express');
const tarotRouter = express.Router();
const tarotController = require('../../controllers/tarotController');

tarotRouter.get('/name/:name', (req,res)=>{
    tarotController.getByTitle(req.params.name).then(result=> res.status(result.status).json(result.payload));
});

tarotRouter.get('/onerandom', (req,res)=>{
    tarotController.getRandomCards(req.query, 1).then(result=> res.status(result.status).json(result.payload));;
})

module.exports = tarotRouter;