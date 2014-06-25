define(["jquery"], function($){ /*** Pourquoi englobant ou non ? */

	function Game (gameId,player1,player2) {
		this.gameId = gameId;
		this.player1 = player1;
		this.player2 = player2;
		this.puckX = 0;
		this.puckY = 0;
		this.puckDir = 0; // Math.random
		/*Debug*/ console.log("6. new Game, ID : "+this.gameId);
		this.setGame();
	}

	Game.prototype.setGame = function (){
		/*Debug*/ console.log("7. Game - new Board");
		
		// Au lancement on crée le board :
		var myHtmlCode = ''
			+'<div class="board">'
			+'	<div class="bottomTxt">'+this.player1+'</div>'
			+'	<div id="'+this.player1+'Score" class="bottomTxt">0</div>'
			+'	<div id="'+this.player2+'Score" class="bottomTxt">0</div>'
			+'	<div class="bottomTxt">'+this.player2+'</div>'
			+'	<div id="'+this.player1+'Pad" class="boardWrap"><div class="pad"></div></div>'
			+'	<div id="'+this.player2+'Pad" class="boardWrap"><div class="pad"></div></div>'
			+'	<div class="boardWrap"><div class="puck"></div></div>'
			+'</div>';
			// Note: Id score : nameScore , idPad : namePad.

		/***?...*/
		$("body").append(myHtmlCode);
		
	};

	Game.prototype.gameplay = function (){
		// gameplay de la partie :
		/*Debug*/ console.log("10. gameplay...");
		/***/
	};

	Game.prototype.render = function (){
		// render de la partie :
		/*Debug*/ console.log("11. render...");
		/*Debug*/ console.log("-------------------------");
		/***/
	};
	
	return Game;
});