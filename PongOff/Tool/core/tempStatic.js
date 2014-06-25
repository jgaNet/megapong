/* VARs */

var player1 = { posY : 88, score : 0, up: false, down: false };
var player2 = { posY : 88, score : 0, up: false, down: false };
var puck = { posX : 248, posY : 128, dirX : (1+Math.random()-Math.random()), dirY : (1+Math.random()-Math.random()) };
var canvas = document.getElementById('monCanvas'), ctx = canvas.getContext('2d');
canvas.width = 498; canvas.height = 260;

/* CONTROLES */
// écoute du clavier :
window.onkeydown = function(event){
	event.preventDefault();
	var key = event.which || event.keyCode;
		/* UP 1 */ if (key == 90){ player1.up = true; }
		/* DOWN 1*/ if (key == 83){ player1.down = true; }
		/* UP 2*/ if (key == 38){ player2.up = true; }
		/* DOWN 2*/ if (key == 40){ player2.down	= true; }
		/* STOP*/ if (key == 80){ alert("Pause"); }		
}
window.onkeyup = function(event){
	event.preventDefault();
	var key = event.which || event.keyCode;
		/* UP 1 */ if (key == 90){ player1.up = false; }
		/* DOWN 1*/ if (key == 83){ player1.down = false; }
		/* UP 2*/ if (key == 38){ player2.up = false; }
		/* DOWN 2*/ if (key == 40){ player2.down = false; }
}


/* LOOP */
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

function runLoop() {
	
	/*MOUVEMENTS*/
	/* up 1 */  if (player1.up == true){ player1.posY-=2; }
	/* down 1*/  if (player1.down == true){ player1.posY+=2; }
	/* up 2*/  if (player2.up == true){ player2.posY-=2; }
	/* down 2*/  if (player2.down == true){ player2.posY+=2; }
	puck.posX += puck.dirX;
	puck.posY += puck.dirY;
	
	/*POSITIONS*/
	if ( player1.posY <= 2 ) { player1.posY = 2; }
	if ( player1.posY >= 176 ) { player1.posY = 176; }
	if ( player2.posY <= 2 ) { player2.posY = 2; }
	if ( player2.posY >= 176 ) { player2.posY = 176; }

	// puck rebondit contre les murs haut/bas :
	if ( puck.posY <= 8 ) { puck.posY = 8; puck.dirY *= -1; }
	if ( puck.posY >= 248 ) { puck.posY = 248; puck.dirY *= -1; }
	
	// collision puck contre les pads ?
	if (	(puck.posX >= 31 && puck.posX <= 47 && puck.posY >= player1.posY+8 && puck.posY+8 <= player1.posY+84 )
			|| ( puck.posX >= 446 && puck.posX <= 461 && puck.posY >= player2.posY+8 && puck.posY+8 <= player2.posY+84 )	) {
		// on inverse les deux dir x et y
		puck.dirX *= -1; puck.dirY *= -1;
		puck.dirX += ( Math.random() - Math.random() );
		puck.dirY += ( Math.random() - Math.random() );
	}

	// puck derrière les pads :
	if ( puck.posX <= 1 ) {
		puck.dirX = (1+Math.random()-Math.random());
		puck.dirY = (1+Math.random()-Math.random());
		puck.posX = 248; puck.posY = 128;
		player2.score++;
		document.getElementById('score2').innerHTML=player2.score;
		
	} else if ( puck.posX >= 498 ) {
		puck.dirX = (1+Math.random()-Math.random());
		puck.dirY = (1+Math.random()-Math.random());
		puck.posX = 248; puck.posY = 128;
		player1.score++;
		document.getElementById('score1').innerHTML=player1.score;
	}
	
	
	/*DRAW*/
	ctx.clearRect(0, 0, 498, 260); // RAFRAICHIR LE CANVAS
	ctx.globalAlpha = 0.5; ctx.fillStyle = '#151439'; // OMBRES :
	ctx.fillRect(34,player1.posY+3,12,80); // pad 1
	ctx.fillRect(456,player2.posY+3,12,80); // pad 2
	ctx.beginPath(); ctx.arc(puck.posX+2,puck.posY+2,8, 0, 2 * Math.PI, false); ctx.fill(); // puck
	ctx.globalAlpha = 1; ctx.fillStyle = '#9C99CA'; // PAD :
	ctx.fillRect(31,player1.posY,12,80); // pad 1
	ctx.fillRect(453,player2.posY,12,80); // pad 2
	ctx.lineWidth = 1; ctx.strokeStyle = '#ffffff';  // PAD CONTOUR :
	ctx.strokeRect(32,player1.posY+1,10,78); // pad 1
	ctx.strokeRect(454,player2.posY+1,10,78); // pad 2
	ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(puck.posX,puck.posY,8, 0, 2 * Math.PI, false); ctx.fill(); // PUCK
	
	
	window.requestAnimationFrame(runLoop);
}

runLoop();
