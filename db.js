var mongoose = require('mongoose-q')();
var user = require('./models/user');
var usertoken = require('./models/usertoken');



exports.init = function() {

    /*
     The application should exit whenever a mongodb connection error occures.
     This event handler will take care of logging the error out (otherwise it would have been
     uncaught, but the process would die anyway)
     */
    mongoose.connection.on('error', function(error) {
        console.error("MongoDb threw an exception:" + error);
        throw error;
    });




//TODO: configuration handling
    user(mongoose);
    usertoken(mongoose);
    mongoose.connect("mongodb://127.0.0.1:27017/rs-api-test", {}, function (err) {
        if (err) {
            console.log("Error while connecting to MongoDB");
            throw err;
        } else {
            console.log("Connected to Mongodb");
        }

    });
    return mongoose.models;
};

module.exports = exports.init();
