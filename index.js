"use strict"

var express = require('express');
var http = require("http");
var app = express();

var registration = require("./routes/registration");
var users = require("./routes/users");


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
