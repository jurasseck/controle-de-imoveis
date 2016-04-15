var Imovel = require('../models/imovel');

module.exports = function(app){
	var controller = {};

	controller.show = function(req,res){
		res.render('externo/map',{
			title: 'Aluguel de imóveis',
			pontos: [
			['Faculdade Integrado', -24.0458588,-52.3815836],
			['Paraná Supermercados', -24.0455129,-52.3748619],
			['Casa',-24.0252581,-52.3599262],
			['Casa Lar Paraná',-24.0506678,-52.399078]
			]
		});
	};

	controller.novo = function(req,res){
		res.render('interno/form', {
			title: 'Novo imóvel'
		});
	};

	return controller;
}