function Tv () {
	this.ecran = new Ecran(this);
	this.chaines = {};
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








