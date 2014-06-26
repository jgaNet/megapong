function Game (gameId,player1,player2) {
	this.gameId = gameId;
	this.player1 = player1;
	this.player2 = player2;

	/*Debug*/ console.log("6. new Game, ID : "+this.gameId);
	
	this.meetPlayers();
}

Game.prototype.meetPlayers = function () { // prévenir les 2 players que la partie se lance
	this.player1.socket.emit("Partie lancee", this.player2.name);
	this.player2.socket.emit("Partie lancee", this.player1.name);
	console.log("Partie lancee");
};

module.exports = Game;