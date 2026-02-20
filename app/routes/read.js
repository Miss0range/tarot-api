const express = require('express');
const readRouter = express.Router();
const tarotController = require('../../controllers/readController');

readRouter.get('/name/:name', (req,res)=>{
    tarotController.getByTitle(req.params.name).then(result=> res.status(result.status).json(result.payload));
});

readRouter.get('/onerandom', (req,res)=>{
    tarotController.getRandomCards(req.query, 1).then(result=> res.status(result.status).json(result.payload));;
})

readRouter.get('/random/:size', (req, res) =>{
    let size = parseInt(req.params.size);
    if (isNaN(size)) res.status(400).json({message:"number of tarots requested must be a number."});
    tarotController.getRandomCards(req.query, size).then(result => res.status(result.status).json(result.payload))
})

module.exports = readRouter;