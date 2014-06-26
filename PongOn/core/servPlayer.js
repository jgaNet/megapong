function Player (name,socket) {
	this.name = name;
	this.inGame = false;
	// this.score = 0;
	// this.posY = 88;
	this.socket = socket;
	// this.up = false;
	// this.down = false;
	/*Debug*/ console.log("3. Player : "+this.name+" waiting.");
	
	this.playerEventsListener();
}

	Player.prototype.playerEventsListener = function () {
		var that = this;
		this.socket.on('MeControlsUp', function(up) {
			that.socket.broadcast.emit('OtherControlsUp',up);
		});
		this.socket.on('MeControlsDown', function(down) {
			that.socket.broadcast.emit('OtherControlsDown',down);
		});
		this.socket.on('MeControlsPause', function(pause) {
			that.socket.broadcast.emit('OtherControlsPause',pause);
		});
	};

module.exports = Player;