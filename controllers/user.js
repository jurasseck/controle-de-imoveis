var User = require('../models/user');

module.exports = function(app){
	var userController = {};

	userController.list = function(req,res){
		User.find().then(function(usuarios){
			if (!usuarios) res.sendStatus(404);

			res.render('interno/usuarios/list', {
				usuarios : usuarios,
				user: req.session.passport.user,
				title: 'Lista de usuários'
			});
		});
	}

	userController.novo = function(req,res){
		res.render('interno/usuarios/form', {
			user: req.session.passport.user,
			title: 'Novo usuário'
		});
	}

	userController._save = function(req,res){
		var b = req.body;
		var user = new User({
			name: b.name,
			access:{
				username: b.username,
				password: b.password,
				admin: b.admin
			}
		});

		user.save(function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/usuarios');
		});
	}

	userController.edit = function(req,res){
		var q = {'_id': req.params.id};
		User.findOne(q, function(err, user){
			if (err) res.sendStatus(404);

			res.render('interno/usuarios/form',{
				user: req.session.passport.user,
				usuario: user
			});
		});
	}

	userController._edit = function(req,res){
		var user = req.body;
		delete user._id;
		User.findByIdAndUpdate(req.params.id,{
			$set: user
		}, function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/usuarios');
		})
	}

	userController._delete = function(req,res){
		var q = {_id: req.params.id};
		User.remove(q, function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/usuarios');
		});

	}

	return userController;
}