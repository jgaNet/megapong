
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

function runLoop(tamere) {
	// if ( this.games.length == 0 ) {
		// /*Debug*/ console.log("8. gameLoop Off");
	// } else {
	
		/*Debug*/ console.log("9. Running...");
		for ( var i=0; i<Lobby.games.length; i++ ) { /***/// Lobby pas accessible évidemment...
			Lobby.games[i].gameplay(); /***/
			Lobby.games[i].render(); /***/
		}

		window.requestAnimationFrame(runLoop);
	// }
}

/* CONTROLES */
// écoute du clavier :
window.onkeydown = function(event){ // d'abord bloquer les scrolls & co au clavier..
	var key = event.which || event.keyCode;
		if ( key == 38 || key == 90 || key == 87 || key == 40 || key == 83 || key == 37
		|| key == 81 || key == 65 || key == 39 || key == 68 || key == 32 || key == 16 || key == 17 )
		{ event.preventDefault(); }
}

window.onkeyup = function(event){ // gérer les controles sur les touches levées (pour éviter répétitions) :
	var key = event.which || event.keyCode;
		/* UP */ if (key == 38 || key == 90 || key == 87){ event.preventDefault(); console.log("Key1"); }
		/* DOWN */ if (key == 40 || key == 83){ event.preventDefault(); console.log("Key2"); }
		/* LEFT */ if (key == 37 || key == 81 || key == 65){ event.preventDefault(); console.log("Key3"); }
		/* RIGHT */ if (key == 39 || key == 68){ event.preventDefault(); console.log("Key4"); }
		/* LIGHT */ if (key == 32 || key == 16 || key == 17){ event.preventDefault(); console.log("Key5"); }
}
