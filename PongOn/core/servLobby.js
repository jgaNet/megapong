var Player = require("./servPlayer");
var Game = require("./servGame");

function Lobby (io) {
	this.players = {};
	this.games = [];
	this.io = io;
	this.nbPlayers = 0;
	
	this.eventsListener();
};

	Lobby.prototype.eventsListener = function () {
		var that = this;
		this.io.on('connection', function(socket) { // on écoute les connexions
			that.newPlayer(socket); // on crée un socket quand il y a connexion
			
			socket.on('disconnect', function() { // s'il disparait cause déco :
				console.log("deco");
				that.deletePlayer(socket.id);
			});
		});
	};

	Lobby.prototype.newPlayer = function (socket){
		// quand un nouveau joueur se connecte :
		this.nbPlayers++;
		var name = "Player"+this.nbPlayers;
		/*Debug*/ console.log("2. new Player "+name);
		this.players[socket.id] = new Player(name,socket);
		this.majPlayerList();
		this.ifTwoWaiters();
	};
	
	Lobby.prototype.deletePlayer = function (socketID){
		// quand joueur inactif depuis...
		delete this.players[socketID];
		this.majPlayerList();
	};

	Lobby.prototype.majPlayerList = function (){
		// maj chaque joueur de la liste des présents :
		var allPlayerNames = {};
		for ( var namePlayer in this.players ) {
			allPlayerNames[namePlayer] = this.players[namePlayer].name;
		}
		for ( var thatPlayer in this.players ) {
			this.players[thatPlayer].socket.emit('Liste players', allPlayerNames); // key, data
		}
	};

	Lobby.prototype.ifTwoWaiters = function (){
		// des joueurs en attente d'une partie ?
		var waitingPlayers = [];
		for ( var aPlayer in this.players ) {
			if ( this.players[aPlayer].inGame == false ) {
				waitingPlayers.push(this.players[aPlayer].socket.id);
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
		
		this.games.push(new Game(gameId,this.players[player1],this.players[player2]/*,controls*/));
		//this.render.gameLoop();
	};
	
	Lobby.prototype.deleteGame = function (){
		// quand les deux joueurs ont quitté la partie :
		/***/
		// relancer une partie s'il reste des joueurs disponibles ?
		this.ifTwoWaiters();
		// arrêter la loop s'il n'y a aucune partie en cours :
		//this.render.gameLoop();
	};
	
module.exports = Lobby;