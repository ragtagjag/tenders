var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var usersDb = db.get('users');
var mailboxes = db.get('mailboxes');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Logger = require('le_node');
var logger = new Logger({ token: config.log });

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getMailbox = _getMailbox;
service.newMailbox = _newMailbox;


module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
    logger.info("USRSERV - Log in attempt for username"+username);
    
    usersDb.findOne({ username: username }, function (err, user) {
        if (err){console.log("err"+err); deferred.reject(err);}
        if (user && !user.active) {
            deferred.reject("User inactive, please complete signup process via email");
            return deferred.promise;
        }

        if (user && user.active && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
            logger.warning("USRSERV - Log in attempt failed for username"+username);
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    usersDb.findById(_id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash', 'signup'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

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
                logger.info("USRSERV - Creating new user for "+userParam.username);
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        // set empty variables
        user.active = false;
        user.tendersApplied = [];
        user.tendersOwned = [];
        user.tendersWatched = [];
        //fix generator
        user.mailbox = ("0" + Math.floor((Math.random() * 9999999) + 1000000));
        _newMailbox(user.mailbox);
        // create mailbox 

        user.type = "act";
        user.description = {};
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
        logger.info("USRSERV - Updating user details for "+userParam.username);
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
            companyName: userParam.companyName,
            email: userParam.email,
            tendersWatched: userParam.tendersWatched
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

function _newMailbox(su){
    new_mailbox = {
        'owner' : su,
        'inbox' : [],
        'sent'  : [],
        'archive': []
    }
    mailboxes.insert(new_mailbox, function(err, res){
       if (err) return;
       // Object inserted successfully.
       console.log("turkel"+res);
       return res // this will return the id of object inserted
    });
}

function _getMailbox(userId){
    var deferred = Q.defer();
    logger.info("USRSERV - Unencrypting mailbox for"+userId);
    usersDb.find({_id:userId}, { fields : {
        _id: 0,
        firstName:false,
        lastName:false,
        username:false,
        hash:false,
        active:false,
        tendersApplied:0,
        tendersOwned:0,
        tendersWatched:0,
        type:0,
        description:0,
        companyName: 0, 
        email: 0}},
        function (err, doc){ 
            if (err) {deferred.reject(err);}
            deferred.resolve(doc);
        });
    return deferred.promise;
    };


























