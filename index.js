"use strict"

var express = require('express');
var http = require("http");
var app = express();

var registration = require("./routes/registration");
var users = require("./routes/users");

var mongoose = require('mongoose-q')();
var user = require('./models/user');
var usertoken = require('./models/usertoken');

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
mongoose.connect(process.env.MONGOPATH ? process.env.MONGOPATH : "mongodb://localhost/rs-api-test", {
       db: {
           native_parser: true
       },
       server: {
           auto_reconnect: true
       }
   }, function(err) {
       if (err) {
           log.error("MongoDB connection can not be established. Error: " + err);
           throw err;
       }
   });

user(mongoose);
usertoken(mongoose);

//TODO: this one should be accessible in other modules as well!
var dal = mongoose.models;



//Setting routes
//TODO: router initialization could be moved out to an external module
var router = require("express").Router();
router.post("/registration", registration.postRegistration);
router.get("/users", users.getUsers);


//Initial Express setup
//TODO: configuration handling
app.set('port', process.env.PORT ? process.env.PORT : 3000);

//TODO: CORS support?
app.options("*", router);
app.get("*", router);
app.put("*", router);
app.post("*", router);

//Let's get to work. :D
http.createServer(app).listen(app.get('port'), function() {
       //TODO: Logging?
       console.info("RS API test started on port " + app.get('port'));
});
