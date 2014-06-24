define(function(){ return Player; });

function Player (name) {
	this.name = name;
	this.inGame = false;
	this.score = -1;
	this.posX = -1;
	this.posY = -1;
	/*Debug*/ console.log("3. Player : "+this.name+" waiting.");
}