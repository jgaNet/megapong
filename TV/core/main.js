
requirejs.config({
	baseUrl: 'libs',
	paths: {
		core: '../core',
		jquery: 'jquery.min'
	}
});

requirejs(["core/tv","core/zapp"], function(Tv,Zapp){
	var maTele = new Tv();
	maTele.ajoutChaine("zouzouTV","img/flower.png");
	maTele.ajoutChaine("loulouTV","img/furbeast.png");
	var maZappette = new Zapp(maTele);
	maZappette.changerChaine("zouzouTV");
	
	var maTele2 = new Tv();
	maTele2.ajoutChaine("zouzouTV","img/flower.png");
	maTele2.ajoutChaine("loulouTV","img/furbeast.png");
	var maZappette2 = new Zapp(maTele2);
	maZappette2.changerChaine("zouzouTV");
});