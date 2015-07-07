
var express = require('express');
var http = require("http");
var app = express();

var registration = require("./routes/registration");
var users = require("./routes/users");


//Setting routes
var router = require("express").Router();
router.post("/registration", registration.postRegistration);
router.get("/users", users.getUsers);

//Initial Express setup
app.set('port', process.env.PORT ? process.env.PORT : 3000);
app.options("*", router);
app.get("*", router);
app.put("*", router);
app.post("*", router);

//Let's get to work. :D
http.createServer(app).listen(app.get('port'), function() {
       console.info("RS API test started on port " + app.get('port'));
});
