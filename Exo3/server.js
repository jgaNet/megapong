var express = require("express");
var http = require("http");
var ejs = require("ejs");
var connect = require("connect");

var app = express();
var server = http.Server(app);

app.set("views",__dirname+"/views");
app.set("view engine", "ejs");

/* Config middleware */
app.use(connect.static(__dirname+"/public"));
	// __dirname = path
	// connect.static -> créer un repertoire public
	
var routes = require("./core/routes");
routes(app); // ou en raccourci : require("core/routes")(app);

/* Lancement serveur */
server.listen(8888, function(){ console.log("yo"); });




/* "npm start" dans la console lance ça */
/* "npm toto" dans la console lance ça */
/* sauf que ça ne marche qu'avec les commandes listées dans npm help */