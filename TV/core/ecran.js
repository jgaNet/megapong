define(function(){ return Ecran; });

function Ecran (tv) {
	this.tv = tv;
}
// Methode générique de Ecran : 
Ecran.prototype.afficherImage = function (image){
	this.tv.$container.html('<img src="'+image+'"/>')
};