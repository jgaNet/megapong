function Zapp (maTele) {
	this.TV = maTele;
}
// Methode générique de Zapp : changer de chaine affiche la chaine.
Zapp.prototype.changerChaine = function (nomChaine){
	this.TV.afficherChaine(nomChaine);
};