"use strict"

var express = require('express');
var http = require("http");
var app = express();
var bodyparser = require("body-parser");
var json_response = require("./modules/middlewares/json_response");
//Initializing app configuration
var config;

try {
    console.log("Initializing RS API test configuration...");
    config = require("./config");
} catch (err) {
    console.log("The application has the following mandatory environment variables, all of them must be set:")
    console.log("   - MAILUSER  - a valid gmail user name");
    console.log("   - MAILPASS  - an application password for the gmail user");
    console.log("   - MAILFROM  - the sent mail's FROM header value");
    console.log("The application supports the following optional environment variables:");
    console.log("   - MONGOCONNECT - the connect string used to connect to a mongod or mongos");
    console.log("   - PORT - the port to listen on");
    console.log("Please make sure to set all the mandatory environment variables.");
    process.exit(1);
}

//Initializing db connections.
var db = require("./db");

//Init routes
var registration = require("./routes/registration");
var users = require("./routes/users");


//Setting routes
//TODO: router initialization could be moved out to an external module
var router = require("express").Router();
router.post("/registration", registration.postRegistration);
router.get("/users/:token", users.getUsers);


//Initial Express setup
app.set('port', config.express.port);
app.use(json_response.setResponseContentType("application/vnd.api+json"));
app.use(bodyparser.json());

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
