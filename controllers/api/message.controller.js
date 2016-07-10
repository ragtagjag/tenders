var config = require('config.json');
var express = require('express');
var router = express.Router();
var messageService = require('services/message.service');
var userService = require('services/user.service');
var Logger = require('le_node');
var logger = new Logger({ token: config.log });
//middleware


// routes
router.post('/send', sendMessage)
router.post('/', getAllMessages);


module.exports = router;

function getAllMessages(req, res){
    
    logger.info("MSGAPI - Get all for user " +req.user.sub);

    userService.getMailbox(req.user.sub)
        .then(function (doc){
            if (doc) {
                    messageService.getAllMessages(doc[0])
                        .then(function (doc){
                            if (doc) {
                                    res.send(doc);     
                                } else {
                                    res.sendStatus(401);
                                }
                            })
                            .catch(function (err) {
                                res.status(402).send(err);
                        });


                } else {
                    res.sendStatus(403);
                }
            })
            .catch(function (err) {
                res.status(404).send(err);
        });
    res.status(200);
}

function sendMessage(req, res){
    logger.info("MSGAPI - Sending new message for user " +req.user.sub);

    userService.getMailbox(req.body.dest)
        .then(function (mid) {
                if (mid) {
                    messageService.postMessage(req.body, mid)
                        .then(function () {
                            if (mailbx) {
                                res.sendStatus(200);
                            } else {
                                res.sendStatus(401);
                            }
                        })
                } else {
                    res.sendStatus(402);
                }
            })
        .catch(function (err) {
            res.status(403).send(err);
        });
    res.status(200);
}
