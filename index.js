
var express = require('express');
var http = require("http");
var app = express();


//Initial Express setup
app.set('port', process.env.PORT ? process.env.PORT : 3000);


//Let's get to work. :D
http.createServer(app).listen(app.get('port'), function() {
       console.info("RS API test started on port " + app.get('port'));
});
