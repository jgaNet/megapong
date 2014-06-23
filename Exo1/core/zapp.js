define(function(){ return Zapp; });

function Zapp (maTele) {
	this.tv = maTele;
	this.creerZapp();
}
// Methode générique de Zapp : changer de chaine affiche la chaine.
Zapp.prototype.changerChaine = function (nomChaine){
	this.tv.afficherChaine(nomChaine);
};

Zapp.prototype.creerZapp = function () {
	this.$container = $('<div class="maZapp"></div>');
	$("body").append(this.$container);
	
	this.$boutons = [];
	
	for ( var maChaine in this.tv.chaines ) {
		var $bouton = $('<div id="'+maChaine+'" class="mesBoutons"></div>');
		this.$boutons.push($bouton);
		$(this.$container).append($bouton);
		var maZap = this;
		$bouton.on("click", function (){
			var monId = $(this).attr("id");
			maZap.changerChaine(monId);
		})
	}
}

