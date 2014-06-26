define(["jquery"], function($){ return Game; });

	function Game (gameId,player1,player2,controls) {
		this.gameId = gameId;
		this.player1 = player1;
		this.player2 = player2;
		this.puck = { posX : 248, posY : 128, dirX : 0, dirY : 0 };
		this.controls = controls;
		this.canvas;
		this.ctx;

		/*Debug*/ console.log("6. new Game, ID : "+this.gameId);
		this.setGame();
	}

	Game.prototype.setGame = function (){
		/*Debug*/ console.log("7. Game - new Board");
		
		// Au lancement on crée le board :
		var myHtmlCode = ''
			+'<div class="board">'
			+'	<div class="bottomTxt">'+this.player1.name+'</div>'
			+'	<div id="'+this.player1.name+'Score" class="bottomTxt">0</div>'
			+'	<div id="'+this.player2.name+'Score" class="bottomTxt">0</div>'
			+'	<div class="bottomTxt">'+this.player2.name+'</div>'
			+'	<canvas id="monCanvas'+this.gameId+'" class="monCanvas"></canvas>'
			+'</div>';
			// Note: Id score : nameScore , idCanvas : monCanvas10 où 10 == gameId
		$("body").append(myHtmlCode);
		
		this.canvas = document.getElementById('monCanvas'+this.gameId);
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 498; this.canvas.height = 260;
	};

	Game.prototype.gameplay = function (){
		// gameplay de la partie :
		/*Debug*/ console.log("10. gameplay...");
		
		/*MOUVEMENTS*/
		if (this.controls.up1 == true){ this.player1.posY-=2; }
		if (this.controls.down1 == true){ this.player1.posY+=2; }
		if (this.controls.up2 == true){ this.player2.posY-=2; }
		if (this.controls.down2 == true){ this.player2.posY+=2; }
		if ( this.puck.dirX == 0 && this.puck.dirY == 0 ) {
			this.puck.dirX = 2+Math.random(); if ( Math.round(Math.random()) ) { this.puck.dirX *= -1; }
			this.puck.dirY = 2+Math.random(); if ( Math.round(Math.random()) ) { this.puck.dirY *= -1; }
		}
		this.puck.posX += this.puck.dirX;
		this.puck.posY += this.puck.dirY;
		
		/*POSITIONS*/
		if ( this.player1.posY <= 2 ) { this.player1.posY = 2; }
		if ( this.player1.posY >= 176 ) { this.player1.posY = 176; }
		if ( this.player2.posY <= 2 ) { this.player2.posY = 2; }
		if ( this.player2.posY >= 176 ) { this.player2.posY = 176; }

		// this.puck rebondit contre les murs haut/bas :
		if ( this.puck.posY <= 8 ) { this.puck.posY = 8; this.puck.dirY *= -1; }
		if ( this.puck.posY >= 248 ) { this.puck.posY = 248; this.puck.dirY *= -1; }
		
		// collision this.puck contre les pads ?
		if (	(this.puck.posX >= 23 && this.puck.posX <= 50 && this.puck.posY >= this.player1.posY-8 && this.puck.posY <= this.player1.posY+92 )
				|| ( this.puck.posX >= 445 && this.puck.posX <= 469 && this.puck.posY >= this.player2.posY-8 && this.puck.posY <= this.player2.posY+92 )	) {
			this.puck.dirX *= -1; // on inverse la dir x
		}
		if (	(this.puck.posX >= 23 && this.puck.posX <= 50 // sur les tranches haut et bas des pads :
					&& ( (this.puck.posY >= this.player1.posY-8 && this.puck.posY <= this.player1.posY-4) || (this.puck.posY >= this.player1.posY+88 && this.puck.posY <= this.player1.posY+92)) )
				|| ( this.puck.posX >= 445 && this.puck.posX <= 469 
					&& ( (this.puck.posY >= this.player2.posY-8 && this.puck.posY <= this.player2.posY-4) || (this.puck.posY >= this.player2.posY+88 && this.puck.posY <= this.player2.posY+92)) )		) {
			this.puck.dirY *= -1; // on inverse la dir y
		}

		// this.puck derrière les pads :
		if ( this.puck.posX <= -20 ) {
			this.puck.dirX = 0;
			this.puck.dirY = 0;
			this.puck.posX = 248; this.puck.posY = 128;
			this.player2.score++;
			document.getElementById(this.player2.name+"Score").innerHTML=this.player2.score;
			
		} else if ( this.puck.posX >= 520 ) {
			this.puck.dirX = 0;
			this.puck.dirY = 0;
			this.puck.posX = 248; this.puck.posY = 128;
			this.player1.score++;
			document.getElementById(this.player1.name+"Score").innerHTML=this.player1.score;
		}
	};

	Game.prototype.render = function (){
		// render de la partie :
		/*Debug*/ console.log("11. render...");
		/*Debug*/ console.log("-------------------------");
		
		/*DRAW*/
		this.ctx.clearRect(0, 0, 498, 260); // RAFRAICHIR LE CANVAS
		this.ctx.globalAlpha = 0.5; this.ctx.fillStyle = '#151439'; // OMBRES :
		this.ctx.fillRect(34,this.player1.posY+3,12,80); // pad 1
		this.ctx.fillRect(456,this.player2.posY+3,12,80); // pad 2
		this.ctx.beginPath(); this.ctx.arc(this.puck.posX+2,this.puck.posY+2,8, 0, 2 * Math.PI, false); this.ctx.fill(); // this.puck
		this.ctx.globalAlpha = 1; this.ctx.fillStyle = '#9C99CA'; // PAD :
		this.ctx.fillRect(31,this.player1.posY,12,80); // pad 1
		this.ctx.fillRect(453,this.player2.posY,12,80); // pad 2
		this.ctx.lineWidth = 1; this.ctx.strokeStyle = '#ffffff';  // PAD CONTOUR :
		this.ctx.strokeRect(32,this.player1.posY+1,10,78); // pad 1
		this.ctx.strokeRect(454,this.player2.posY+1,10,78); // pad 2
		this.ctx.fillStyle = '#ffffff'; this.ctx.beginPath(); this.ctx.arc(this.puck.posX,this.puck.posY,8, 0, 2 * Math.PI, false); this.ctx.fill(); // this.puck
	};
	