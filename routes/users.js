var db = require("../db");
var Q = require("q");
var _ = require("lodash");

exports.getUsers = function(req,res) {
    db.UserToken.find( {
        tokenValue : req.params.token
    }).count().execQ()
        .then(function (data) {
            var deferred = Q.defer();
            if (data === 0) {
                deferred.reject("INVALID_TOKEN");
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        })
        .then(function (f) {
            return db.User.findQ();
        })
        .then(function(users) {

            //Maybe the schema was far from ideal for JSON API spec. :D
            var resUsers = [];
            _.forEach(users, function (user) {
                var resUser = {
                    type : "User",
                    id : user._id.toString()
                };

               resUser.attributes = {
                   name : user.name,
                   email : user.email
               };
                resUsers.push(resUser);
            });
            res.send(JSON.stringify({data: resUsers}));
        })
        .fail(function (reason) {
            res.send({error: reason});
        }).done();
}
