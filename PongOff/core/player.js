define(function(){ return Player; });

function Player (name) {
	this.name = name;
	this.inGame = false;
	this.score = 0;
	this.posY = 88;
	this.up = false;
	this.down = false;
	/*Debug*/ console.log("3. Player : "+this.name+" waiting.");
}