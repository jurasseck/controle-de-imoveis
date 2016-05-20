module.exports = function(app, passport){
	var imovelController = require('../controllers/imovel')(app);
	var userController = require('../controllers/user')(app);

	app.get('/', function(req,res){
		res.render('interno/login');
	});

	app.get('/interno/login', function(req,res){
		res.render('interno/login');
	});

	app.post('/interno/login',passport.authenticate('local',{
		successRedirect: '/interno',
		failureRedirect: '/interno/login'
	}));

	app.get('/interno', isLoggedIn, imovelController.show);
	app.post('/interno', isLoggedIn, imovelController.show);

	app.get('/interno/imoveis', isLoggedIn, imovelController.list);
	app.get('/interno/imovel/:id', isLoggedIn, imovelController.edit);
	app.post('/interno/imovel/:id', isLoggedIn, imovelController._update);
	app.get('/interno/imovel/delete/:id', isLoggedIn, imovelController._delete);
	app.get('/interno/imovel', isLoggedIn, imovelController.novo);
	app.post('/interno/imovel', isLoggedIn, imovelController._save);

	app.get('/interno/usuarios', isLoggedIn, isAdmin, userController.list);
	app.get('/interno/usuario', isLoggedIn, isAdmin, userController.novo);
	app.post('/interno/usuario', isLoggedIn, isAdmin, userController._save);
	app.get('/interno/usuario/:id', isLoggedIn, isAdmin, userController.edit);
	app.post('/interno/usuario/:id', isLoggedIn, isAdmin, userController._edit);
	app.get('/interno/usuario/delete/:id', isLoggedIn, isAdmin, userController._delete);

	app.get('/interno/logout', isLoggedIn, function(req,res){
		req.logout();
		res.redirect('/');
	});

}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/interno/login');
}

function isAdmin(req,res,next){
	if (req.session.passport.user.access.admin)
		return next();

	res.redirect('/interno');
}