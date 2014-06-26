define(function(){ return Render; });

function Render (games) {
	this.games = games;
	this.runTheLoop = false;
	this.controls = { up1:false, down1:false, up2:false, down2:false }; /***/
	this.setLoop();
	this.setControls();
}
	
	Render.prototype.setControls = function (){
		/*Debug*/ console.log("1. new Render setControls");
		// écoute du clavier :
		var thatRender = this; // pour éviter probleme scope
		// puisque le this derrière devient celui de window
		window.onkeydown = function(event){
			event.preventDefault();
			var key = event.which || event.keyCode;
				/* UP 1 */ if (key == 90){ thatRender.controls.up1 = true; }
				/* DOWN 1*/ if (key == 83){ thatRender.controls.down1 = true; }
				/* UP 2*/ if (key == 38){ thatRender.controls.up2 = true; }
				/* DOWN 2*/ if (key == 40){ thatRender.controls.down2	= true; }
				/* STOP*/ if (key == 80){ alert("Pause"); }		
		}
		window.onkeyup = function(event){
			event.preventDefault();
			var key = event.which || event.keyCode;
				/* UP 1 */ if (key == 90){ thatRender.controls.up1 = false; }
				/* DOWN 1*/ if (key == 83){ thatRender.controls.down1 = false; }
				/* UP 2*/ if (key == 38){ thatRender.controls.up2 = false; }
				/* DOWN 2*/ if (key == 40){ thatRender.controls.down2 = false; }
		}
	}

	Render.prototype.setLoop = function (){
		/*Debug*/ console.log("1. new Render setLoop");
		/* compatibilité */
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (
				function() {
					return window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function( callback, elementDom )
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
			var render = this; // pour éviter probleme scope
			// puisque le this derrière devient celui de window
			window.requestAnimationFrame( function(timestep) {
					render.runLoop()
				}
			);
		}
	};