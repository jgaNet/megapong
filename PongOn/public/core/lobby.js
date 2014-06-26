define(["core/player","core/game"], function(Player,Game){ 

	function Lobby () {
		this.players = {};
		/*Debug*/ console.log("1. new Lobby");
	}

	Lobby.prototype.newPlayer = function (name){
		// quand un nouveau joueur se connecte :
		/*Debug*/ console.log("2. new Player "+name);
		this.players[name] = new Player(name);
		this.ifTwoWaiters();
	}
	
	Lobby.prototype.deletePlayer = function (){
		// quand joueur inactif depuis...
		/***/
	};
	
	Lobby.prototype.launchGameHere = function (player1,player2,socket){
		// créer 2 players dans new Game :
		console.log("launchgamehere "+player1+" "+player2);
		this.game = new Game(new Player(player1,socket),new Player(player2,socket));
		this.game.gameLoop();
	};
	
	Lobby.prototype.deleteGame = function (){
		// quand les deux joueurs ont quitté la partie :
		/***/
		// relancer une partie s'il reste des joueurs disponibles ?
		this.ifTwoWaiters();
		// arrêter la loop s'il n'y a aucune partie en cours :
		this.game.gameLoop();
	};
	
	return Lobby; 
});