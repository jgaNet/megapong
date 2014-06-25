/* VARs */

var player1 = { posY : 88, score : 0 };
var player2 = { posY : 88, score : 0 };
var puck = { posX : 240, posY : 120, dirX : Math.random(), dirY : Math.random() };

document.getElementById('pad1').style.left="31px";
document.getElementById('pad2').style.left="453px";
	
/* CONTROLES */
// écoute du clavier :
window.onkeydown = function(event){
	var key = event.which || event.keyCode;
		/* UP 1 */ if (key == 90){ event.preventDefault(); player1.posY-=4; }
		/* DOWN 1*/ if (key == 83){ event.preventDefault(); player1.posY+=4; }
		/* UP 2*/ if (key == 38){ event.preventDefault(); player2.posY-=4; }
		/* DOWN 2*/ if (key == 40){ event.preventDefault(); player2.posY+=4; }
		/* STOP*/ if (key == 80){ event.preventDefault(); alert("Pause"); }		
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
	
	if ( player1.posY <= 1 ) { player1.posY = 1; }
	if ( player1.posY >= 177 ) { player1.posY = 177; }
	if ( player2.posY <= 1 ) { player2.posY = 1; }
	if ( player2.posY >= 177 ) { player2.posY = 177; }
	document.getElementById('pad1').style.top=player1.posY+"px";
	document.getElementById('pad2').style.top=player2.posY+"px";
	
	puck.posX *= puck.dirX;
	puck.posY *= puck.dirY;
	if ( puck.posX <= 1 ) { puck.posX = 240; player2.score++; document.getElementById('score2').innerHTML=player2.score; }
	if ( puck.posX >= 480 ) { puck.posX = 240; player1.score++; document.getElementById('score1').innerHTML=player1.score; }
	if ( puck.posY <= 1 ) { puck.posY = 1; puck.dirY *= -1; }
	if ( puck.posY >= 240 ) { puck.posY = 240; puck.dirY *= -1; }
	document.getElementById('puck').style.left=puck.posX+"px";
	document.getElementById('puck').style.top=puck.posY+"px";

	window.requestAnimationFrame(runLoop);
}

runLoop();

