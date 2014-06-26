function tchat(io) {
	io.on('connection', function(socket){
		// socket = canal de connexion entre client et serveur
		
		// utilisation possible :
		// var player = {};
		// player[socket.id] = new ServerPlayer();
		console.log("socket lol");
		
		// socket.join('room1'); // le connecté rejoint une room.
		
		socket.on('my event', function(inputValue) {
			// le serveur reçoit un message du client
			console.log("New message :");
			console.log(inputValue);
			
			socket.broadcast.emit('message',
				{	// array :
					// broadcast envoie à tous (dans la room) sauf le connecté
					'text' : inputValue
				}
			);
		
			socket.emit('message',
				{	// array :
					// emit envoie à la personne connectée
					'text' : inputValue
				}
			); /* on le met dans socket.on pour que le connecté ne voie son message envoyé
			qu'une fois qu'il a été reçu et retransmis par le serveur. Ex évite l'affichage par le client d'un message reçu par le client mais pas par le serveur. */
		
		});
		
		
		
	});
}

module.exports = tchat;