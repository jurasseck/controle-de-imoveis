var Imovel = require('../models/imovel');

module.exports = function(app){
	var controller = {};

	controller.show = function(req,res){
		var q = {status: true};
		Imovel.find(q, 'title description address', function(err, imoveis){
			if (err) res.sendStatus(500);

			if (!imoveis) res.sendStatus(404);

			res.render('externo/map',{
				title: 'Aluguel de imóveis',
				imoveis: imoveis
			});
		});
	};

	controller.novo = function(req,res){
		res.render('interno/imovel/form', {
			title: 'Novo imóvel'
		});
	};

	controller.list = function(req,res){
		Imovel.find().then(function(imoveis){
			if (!imoveis) res.sendStatus(404);

			res.render('interno/imovel/list',{
				title: 'Listagem de imoveis',
				imoveis: imoveis,
			});
		})
	}

	controller.edit = function(req,res){
		var q = {'_id': req.params.id};
		Imovel.findOne(q, function(err, imovel){
			if (err) res.sendStatus(404);
			res.render('interno/imovel/form',{
				imovel: imovel
			});
		})
	}

	controller._save = function(req,res){
		var body = req.body;
		var imovel = new Imovel({
			title: body.title,
			description: body.description,
			address:{
				street: body.street,
				number: body.number,
				neighborhood: body.neighborhood,
				city: body.city,
				latitude: body.latitude,
				longitude: body.longitude
			},
			price : body.price,
			status: true
		});

		imovel.save(function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/imoveis');
		});
	}

	controller._update = function(req,res){
		var imovel = req.body;
		delete imovel._id;
		Imovel.findByIdAndUpdate(req.params.id,{
			$set: imovel
		}, function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/imoveis');
		})
	}

	controller._delete = function(req,res){
		var q = {_id: req.params.id};
		Imovel.remove(q, function(err){
			if (err) res.sendStatus(500);

			res.redirect('/interno/imoveis');
		})
	}

	controller._list = function(req,res){
		
	}

	controller._get = function(req,res){

	}

	return controller;
}