define(["core/player","core/game","core/render"/*,"jquery"*/], function(Player,Game,Render/*,$*/){ 

	function Lobby () {
		this.players = {};
		this.games = [];
		/*Debug*/ console.log("1. new Lobby");
		this.render = new Render(this.games);
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
	
	Lobby.prototype.ifTwoWaiters = function (){
		// des joueurs en attente d'une partie ?
		var waitingPlayers = [];
		for ( var aPlayer in this.players ) {
			if ( this.players[aPlayer].inGame == false ) {
				waitingPlayers.push(this.players[aPlayer].name);
			}
		}
		/*Debug*/ console.log("4. ifTwoWaiters : "+waitingPlayers.length+" players waiting...");
		// random matching :
		for ( var i=0; i<waitingPlayers.length; i++ ) {
			if (waitingPlayers.length >= 2) {
				var thePlayer1 = waitingPlayers[i];
				var randomOpponent = 1+(Math.random()*(waitingPlayers.length-2))>>0;
				var thePlayer2 = waitingPlayers[randomOpponent];
				this.launchGame(thePlayer1,thePlayer2);
				waitingPlayers.splice(0,1);
				waitingPlayers.splice(randomOpponent-1,1);
                i--;
			} else { i=waitingPlayers.length; }
		}
	};
	
	Lobby.prototype.launchGame = function (player1,player2){
		/*Debug*/ console.log("5. launchGame");
		// on prépare la nouvelle partie et la loop :
		var gameId = this.games.length;
		// les joueurs ne sont plus disponibles :
		this.players[player1].inGame = true;
		this.players[player2].inGame = true;
		this.games.push(new Game(gameId,this.players[player1],this.players[player2],this.render.controls));
		this.render.gameLoop();
	};
	
	Lobby.prototype.deleteGame = function (){
		// quand les deux joueurs ont quitté la partie :
		/***/
		// relancer une partie s'il reste des joueurs disponibles ?
		this.ifTwoWaiters();
		// arrêter la loop s'il n'y a aucune partie en cours :
		this.render.gameLoop();
	};
	
	return Lobby; 
});