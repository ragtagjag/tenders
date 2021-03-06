﻿var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var tendersDb = db.get('tenders');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Logger = require('le_node');
var logger = new Logger({ token: config.log });

var service = {};

service.getAllPosts = getAllPosts;
service.getByTitle = getByTitle;
service.createTender = createTender;
service.addQuestion = addQuestion;

/* Services not yet available

service.update = update;
service.delete = _delete;
*/
module.exports = service;

function getByTitle(title) {
    var deferred = Q.defer();
    tendersDb.find({title: title}, function (err, post) {
        if (err) deferred.reject(err);

        if (post) {
            logger.info("TSERV - Retrieving post by title");
            deferred.resolve(post);
        } else {
            // user not found
            logger.error("TSERV - No user found :O");
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAllPosts() {
    var deferred = Q.defer();
    tendersDb.find({}, function (err, posts) {
        if (err) deferred.reject(err);

        if (posts) {
            // return posts
            deferred.resolve(posts);
        } else {
            // no posts found
            logger.error("TSERV - No posts found :O");
            deferred.resolve();
        }
    });

    return deferred.promise;

}
    
function createTender(post){
    var deferred = Q.defer();
    // validation
    console.log("SERVICE - POST.TITLE" + post.title);
    tendersDb.findOne(
        { title: post.title },
        function (err, post) {
            if (err){
             deferred.reject(err);
            }

            if (post) {
                // already exists
                deferred.reject('Title already exists');
            } else {
                createNewTender();
            }
        });

    function createNewTender() {
        // set user object to userParam without the cleartext password
        console.log("Am i here????? :D: ");
        console.log("post" + JSON.stringify(post));

        tendersDb.insert(
            post,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

    /*
    var posts = [];
    posts.push()

    var deferred = Q.defer();

    usersDb.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;*/



function create(userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        usersDb.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            usersDb.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        usersDb.findAndModify(
            { _id: _id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    usersDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });

    return deferred.promise;
}

function addQuestion(body){
    var deferred = Q.defer();
    console.log(body.question + " | " + body.id);
    tendersDb.update({_id: body.id}, {$push: {questions: {
                            title: body.question,
                            answers : []
                        }}}, function (err, doc) {
                            if (err) deferred.reject(err);

                            deferred.resolve();
                        })
                     return deferred.promise;

}