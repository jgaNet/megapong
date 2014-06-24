requirejs.config({
	baseUrl: 'libs',
	paths: {
		core: '../core',
		jquery: 'jquery.min'
	}
});

requirejs(["core/lobby"], function(Lobby){
	// au lancement du serveur un lobby gère joueurs et parties :
	var myLobby = new Lobby();
	
	// des joueurs se connectent :
	myLobby.newPlayer("Mimi");
	myLobby.newPlayer("Kiki");
	myLobby.newPlayer("Loulou");
	myLobby.newPlayer("Zouzou");
	myLobby.newPlayer("Nana");
	
	// temp..
	// runLoop(myLobby);
});