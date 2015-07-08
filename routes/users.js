var db = require("../db");
var Q = require("q");
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
            //TODO: attributes(name), type for each user...
            res.send(JSON.stringify({data: users}));
        })
        .fail(function (reason) {
            res.send({error: reason});
        }).done();
  res.send(JSON.stringify({world: "Hello"}));
}
