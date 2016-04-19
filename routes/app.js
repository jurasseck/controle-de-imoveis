module.exports = function(app, passport){
	var imovelController = require('../controllers/imovel')(app);

	app.get('/', imovelController.show);

	app.get('/imoveis', imovelController.show);

	app.get('/interno/login', function(req,res){
		res.render('interno/login');
	});

	app.post('/interno/login',passport.authenticate('local',{
		successRedirect: '/interno',
		failureRedirect: '/interno/login'
	}));

	app.get('/interno', isLoggedIn, function(req,res){
		res.render('interno/index');
	});
	app.get('/interno/imoveis', imovelController.list);
	app.get('/interno/imovel/:id', imovelController.edit);
	app.get('/interno/imovel', imovelController.novo);
	app.post('/interno/imovel', imovelController._save);

}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/interno/login');
}