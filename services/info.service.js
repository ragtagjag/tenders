var config = require('config.json');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(config.connectionString);
var actsDb = db.get('acts');
var venuesDb = db.get('venues');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var Logger = require('le_node');
var logger = new Logger({ token: config.log });

var service = {};

service.getActs = getActs;
service.getVenues = getVenues;


/*
service.x = x;
service.getEvents = getEvents;
*/
module.exports = service;

function getActs(){
    var deferred = Q.defer();
    actsDb.find({}, {fields: {actName: 1, actDescShort: 1, actDescLong: 1, media: 1}}, function (err, acts) {
        if (err) deferred.reject(err);

        if (acts) {
            logger.info("ISERV - Retrieving all acts");
            deferred.resolve(acts);
        } else {
            // user not found
            logger.warning("ISERV - Acts not found");
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getVenues(){
    var deferred = Q.defer();
    venuesDb.find({}, {fields: {venueName: 1, venueDescShort: 1, venueDescLong: 1, media: 1}}, function (err, venues) {
        if (err) deferred.reject(err);

        if (venues) {
            logger.info("ISERV - Retrieving all venues");
            deferred.resolve(venues);
        } else {
            // user not found
            logger.warning("ISERV - Venues not found");
            deferred.resolve();
        }
    });

    return deferred.promise;
}