module.exports = function(app, passport){
	var imovelController = require('../controllers/imovel')(app);

	app.get('/', imovelController.show);
	app.post('/', imovelController.show);
	app.get('/imoveis', imovelController.show);
	app.post('/imoveis', imovelController.show);

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
	
	app.get('/interno/imoveis', isLoggedIn, imovelController.list);
	app.get('/interno/imovel/:id', isLoggedIn, imovelController.edit);
	app.post('/interno/imovel/:id', isLoggedIn, imovelController._update);
	app.get('/interno/imovel/delete/:id', isLoggedIn, imovelController._delete);
	app.get('/interno/imovel', isLoggedIn, imovelController.novo);
	app.post('/interno/imovel', isLoggedIn, imovelController._save);

}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/interno/login');
}