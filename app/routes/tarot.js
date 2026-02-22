const express = require('express');
const tarotRouter = express.Router();
const tarotController = require('../../controllers/tarotController');

tarotRouter.get("/title/:title", (req,res,next) => {
    const title = req.params.title;
    tarotController.getByTitle(title).then((result)=> res.status(200).json(result)).catch(next);
});

module.exports = tarotRouter;