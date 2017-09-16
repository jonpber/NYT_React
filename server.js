var express = require("express");
var body = require("body-parser");
var path = require("path");
var app = express();
// var method = require("method-override");
var mongoose = require("mongoose");
var Article = require("./models/Article.js");

// mongoose.connect("mongodb://heroku_kgl3j6hw:v2c89odgjfsltmrr423aq7c0bj@ds135444.mlab.com:35444/heroku_kgl3j6hw");
var db = mongoose.connection;
mongoose.Promise = Promise;

var port = process.env.PORT || 7000;

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));
// app.use(method("_method"));

app.get("/api/saved", function(req, res){
	Article.find({}).exec(function(error, data){
		res.json(data);
	})
})

app.get("*", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
})


app.listen(port, function(error){
	if (error){
		return console.log(error);
	}

	console.log("server is listening on http://localhost:%s", port);
});
