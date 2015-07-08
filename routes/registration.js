var Q = require("q");
var validator = require("validator");
var db = require("../db");
var uuid = require('node-uuid');
exports.postRegistration = function(req,res) {
    var data = req.body;
    validateData(data)
        .then(saveUser)
        .then(saveToken)
        .then(sendEmail)
        .then(function (ok) {
            res.send(JSON.stringify({hello: "World"}));
        })
        .fail(function (err) {
            console.log(err);
            res.send(JSON.stringify({error: err}));
        })
        .done();

}

function saveUser(data) {
    var deferred = Q.defer();
    var userObjToBeSaved = {name: data.name, email: data.email};
    var user = new db.User(userObjToBeSaved);
    user.saveQ()
        .then(function (userObjPersisted) {
            data._user = userObjPersisted;
            deferred.resolve(data);
        }).
        fail(function (err) {
            console.log("Error while saving user object for registration:", err);
            deferred.reject("INTERNAL_ERROR");
        }).done();

    return deferred.promise;


}

function saveToken(data) {
    var deferred = Q.defer();
    var tokenObjToBeSaved = {tokenValue: uuid.v4(), user: data._user._id};
    var token = new db.UserToken(tokenObjToBeSaved);
    token.saveQ()
        .then(function (tokenPersisted) {
            data._token = tokenPersisted;
            deferred.resolve(data);
        })
        .fail(function (err) {
            console.log("Error while saving user token for registration:", err);
            deferred.reject("INTERNAL_ERROR");
    }).done();
    return deferred.promise;
}

function sendEmail(data) {
    console.log(data._token.tokenValue);

}

function validateData(data) {
    var deferred = Q.defer();
    if (typeof data == "undefined") {
        deferred.reject("MISSING_REQUEST_BODY");
        return deferred.promise;
    }
    var errors = [];

    if (typeof data.name == "undefined") {
        errors.push("MISSING_NAME");
    }
    if (typeof data.email == "undefined") {
        errors.push("MISSING_EMAIL");
    } else if (!validator.isEmail(data.email)) {
        errors.push("INVALID_EMAIL");
    } else {
        //TODO: duplicated e-mail addresses
    }

    if (errors.length != 0) {
        deferred.reject(errors);
        return deferred.promise;
    } else  {
        deferred.resolve(data);
    }

    return deferred.promise;
}
