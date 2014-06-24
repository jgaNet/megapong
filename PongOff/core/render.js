define(function(){ return Render; });

function Render (games) {
	this.games = games;
	this.runTheLoop = false;
	this.setLoop();
}

	Render.prototype.setLoop = function (){
		/* compatibilité */
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (
				function() {
					return window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element )
					{ window.setTimeout( callback, 1000 / 60 ); };
				}
			)();
		}
	};

	Render.prototype.gameLoop = function (){
		// s'il y a au moins une partie, gameloop on, si zero partie, off.
		/*Debug*/ console.log("8. gameLoop ?");
		if ( this.games.length >= 1 && this.runTheLoop == false ) {
			/*Debug*/ console.log("8. gameLoop On");
			this.runTheLoop = true;
			this.runLoop();
			
		} else if ( this.games.length == 0 ) { /*Debug*/ console.log("8. gameLoop Off"); }
	};
	
	Render.prototype.runLoop = function (){
		/*Debug*/ console.log("9. Running ? "+this.runTheLoop);
		if ( this.runTheLoop == true ) {
		
			/*Debug*/ console.log("9. Running...");
			for ( var i=0; i<this.games.length; i++ ) {
				this.games[i].gameplay();
				this.games[i].render();
			}
			
			window.requestAnimationFrame(this.runLoop);
		}
	};