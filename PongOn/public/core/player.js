define(function(){ return Player; });

function Player (name,socket) {
	this.name = name;
	this.inGame = false;
	this.score = 0;
	this.posY = 88;
	this.up = false;
	this.down = false;
	this.pause = false;
	this.socket = socket;
	/*Debug*/ console.log("3. Player : "+this.name+" created.");
	
	this.setControls();
	this.otherControls();
}

	Player.prototype.setControls = function (){
		/*Debug*/ console.log("1. new Play setControls");
		// écoute du clavier :
		var thatPlayer = this; // pour éviter probleme scope
		// puisque le this derrière devient celui de window
		window.onkeydown = function(event){
			event.preventDefault();
			var key = event.which || event.keyCode;
				/* UP*/ if (key == 38){ thatPlayer.up = true; thatPlayer.socket.emit('MeControlsUp', thatPlayer.up); }
				/* DOWN*/ if (key == 40){ thatPlayer.down= true; thatPlayer.socket.emit('MeControlsDown', thatPlayer.down); }
				/* STOP*/ if (key == 80){ alert("Pause"); thatPlayer.pause= true; thatPlayer.socket.emit('MeControlsPause', thatPlayer.pause); }
		}
		window.onkeyup = function(event){
			event.preventDefault();
			var key = event.which || event.keyCode;
				/* UP*/ if (key == 38){thatPlayer.up = false; thatPlayer.socket.emit('MeControlsUp', thatPlayer.up); }
				/* DOWN */ if (key == 40){ thatPlayer.down = false; thatPlayer.socket.emit('MeControlsDown', thatPlayer.down); }
		}
	};

	Player.prototype.otherControls = function (){
		// on récupère les controles de l'autre (stockés dans notre socket à nous) :
		var that = this;
		if ( this.name != "Me" ) {
			this.socket.on('OtherControlsUp', function (up){
				that.up = up;
			});
			this.socket.on('OtherControlsDown', function (down){
				that.down = down;
			});
			this.socket.on('OtherControlsPause', function (pause){
				that.pause = pause;
			});
		}
	};