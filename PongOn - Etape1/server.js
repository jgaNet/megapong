var express = require("express");
var http = require("http");
var ejs = require("ejs");
var connect = require("connect");

var app = express();
var server = http.Server(app);
var io = require("socket.io")(server); // à lancer après le server
// et à compléter par un script dans la view ejs pour lancer coté client.
// syntaxe bizarre : cf var routes.

app.set("views",__dirname+"/views");
app.set("view engine", "ejs");

require("./core/tchat")(io);
// on pourrait mettre un var chat = .. mais on s'en sert pas après.

/* Config middleware */
app.use(connect.static(__dirname+"/public"));
	// __dirname = path
	// connect.static -> créer un repertoire public
	
var routes = require("./core/routes");
routes(app); // ou en raccourci : require("core/routes")(app);

/* Lancement serveur */
server.listen(8888, function(){ console.log("yo"); });



/* INFO json */
// /* "npm start" dans la console lance le script "start" */
// /* "npm toto" dans la console lance le script "toto" */
// /* sauf que ça ne marche qu'avec les commandes listées dans npm help */