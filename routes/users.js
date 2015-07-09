var db = require("../db");
var Q = require("q");
var _ = require("lodash");

exports.getUsers = function(req,res) {
    if (!req.query.token) {
        res.status(403).json({error: ["INVALID_TOKEN"]});
        return;
    }
    db.UserToken.find( {
        tokenValue : req.query.token
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
            res.json({data: resUsers});
        })
        .fail(function (reason) {
            //Room for improvement: Response codes could depend on the reasons.
            res.status(403).json({error: [reason]});
        }).done();
}
