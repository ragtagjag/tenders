var config = require('config.json');
var express = require('express');
var router = express.Router();
var tenderService = require('services/tender.service');

//middleware


// routes
router.get('/getAll', getAll)
router.get('/:id', getTender);
router.post('/createTender', createTender);
router.put('/:_id', updateUser);
router.delete('/deleteTender', deleteTender);
router.post('/addQuestion/:id', addQuestion);

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
    console.log("I have started the createTender func...");
    console.log(req.body);
    console.log("USER :::: "+req.body.user);
    tenderService.createTender(req.body)
        .then(function (){
            // do something here 
        });
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

function deleteTender(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own posts!');
    }

    tenderService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function addQuestion(req, res){
        console.log("Lets look at the req body" +req.body.question + " | " + req.params.id);  
        tenderService.addQuestion(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
        });
}