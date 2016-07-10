var config = require('config.json');
var express = require('express');
var router = express.Router();
var messageService = require('services/message.service');
var infoService = require('services/info.service');
var Logger = require('le_node');
var logger = new Logger({ token: config.log });
//middleware


// routes
router.post('/acts', getActs)
router.post('/venues', getVenues);


module.exports = router;

function getActs(req, res){
    
    logger.info("IAPI - Get all acts" +req.user.sub);

    infoService.getActs()
        .then(function (doc){
            if (doc) {
                res.send(doc);
            } else {
                res.sendStatus(403);
            }
        })
        .catch(function (err) {
            res.status(404).send(err);
    });
    res.status(200);
}

function getVenues(req, res){
    
    logger.info("IAPI - Get all venues" +req.user.sub);

    infoService.getVenues()
        .then(function (doc){
            if (doc) {
                res.send(doc);
            } else {
                res.sendStatus(403);
            }
        })
        .catch(function (err) {
            res.status(404).send(err);
    });
    res.status(200);
}
