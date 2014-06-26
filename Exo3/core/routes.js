function giveMeRoutes (app) {

	app.get("/", function(request, response) {
		response.render('index', {
			message : 'De groeten'
		});
	});
	app.get("/page-lol", function(request, response) {
		response.render('index', {
			message : 'De Lol'
		});
	});

}

module.exports = giveMeRoutes;