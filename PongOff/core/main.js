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
	
	// quand il y en a au moins deux le lobby crée une game.
	// var oneGame = new Game("Mimi","Kiki");
});