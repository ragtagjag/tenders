var config = require('config.json');
var express = require('express');
var router = express.Router();
var tenderService = require('services/tender.service');

// routes
router.get('/getAll', getAll)
router.get('/:id', getTender);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

function getAll(req, res){
    console.log("have i got here??");
    tenderService.getAllPosts()
        .then(function (posts) {
            if (posts) {
                res.send(posts);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(403).send(err);
        });
}

function getTender(req, res) {
    console.log("********************************************TITLE  "+req.params.id); 
    tenderService.getByTitle(req.params.id)
        .then(function (title) {
            if (title) {
                res.send(title);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function createTender(req, res) {
    //tenderService.createTender(req.body)
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    tenderService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    tenderService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}