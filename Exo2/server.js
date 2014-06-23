var express = require("express");
var http = require("http");
var ejs = require("ejs");
var connect = require("connect");

var app = express();
var server = http.Server(app);

app.set("views",__dirname+"/views");
app.set("view engine","ejs");

/* Config middleware */
app.use(connect.static(__dirname+"/public"));
	// __dirname = path
	// connect.static -> créer un repertoire public

/* Roots */
app.get("/", function(request, response) {
	response.sendfile("index.html"); // renvoie la page index
});

/* Lancement serveur */
server.listen(8888, function(){ console.log("yo"); });