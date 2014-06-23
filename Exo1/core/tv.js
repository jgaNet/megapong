define(["core/ecran","core/chaine","jquery"], function(Ecran,Chaine,$){ 

	function Tv () {
		this.ecran = new Ecran(this);
		this.chaines = {};
		this.creerTeleviseur();
	}
	// Methode générique de Tv : ajouter une chaine (Chaine) dans this.chaines = {}; ligne 3
	Tv.prototype.ajoutChaine = function (nomChaine, nomImage){
		this.chaines[nomChaine] = new Chaine(nomChaine, nomImage);
	};
	// Methode générique de Tv :
	Tv.prototype.afficherChaine = function (nomChaine) {
		if ( this.chaines[nomChaine] ) {
			this.ecran.afficherImage(this.chaines[nomChaine].image) ;
		} else {
			alert("error"); 
		}
	};
	
	Tv.prototype.creerTeleviseur = function () {
		this.$container = $('<div class="maTv"></div>');
		$("body").append(this.$container);
	}

	return Tv; 
});