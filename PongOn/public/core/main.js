requirejs.config({
	baseUrl: '/libs',
	paths: {
		core: '/core',
		jquery: 'jquery.min',
		socketio: '../socket.io/socket.io' // chemin invisible
	},
	shim: {
		'socketio': {
		  exports: 'io' // pas de define possible (pas de dependance prévue pour require.js) donc exporte sous var io.
		  // dans la lib socket io il n'y a pas de define / return, comme on les as mises à la main dans nos propres fichiers.
		}
	}
});

requirejs(["core/lobby","jquery","socketio"], function(Lobby,$,io){
	// note: jquery. $ = var globale donc utilisable partout sans define englobants.
	
	var socket = io('http://localhost'); // donne le socket du connecté
	var lobbyHere = new Lobby(socket); // affichage
	
	socket.on('Liste players', function (players){ // récupère la liste des players
		$("#clientLobby").html(JSON.stringify(players));
	});
	
	socket.on('Partie lancee', function (otherPlayer){ // récupère la liste des players
		console.log("launch with "+otherPlayer);
		lobbyHere.launchGameHere("Me",otherPlayer,socket);
	});
	
	// runLoop(myLobby);
});