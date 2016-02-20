var config = require('config.json');
var express = require('express');
var router = express.Router();
var messageService = require('services/message.service');

//middleware


// routes
router.post('/send', sendMessage)
router.post('/:id', getAllMessages);


module.exports = router;

function getAllMessages(req, res){
    console.log("Looking for new mail | "+req.params.id);
    messageService.getAllMessages(req.params.id, req.body.xaxl)
        .then(function (mailbox) {
            if (mailbox) {
                res.send(mailbox);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(403).send(err);
        });
}

function sendMessage(req, res){
    console.log(JSON.stringify(req.body))
    messageService.postMessage(req.body)
        .then(function (mailbox) {
            if (mailbox) {
                res.send(mailbox);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(403).send(err);
        });
    res.status(200);
}
