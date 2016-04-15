module.exports = function(app){
	var imovelController = require('../controllers/imovel')(app);

	app.get('/',function(req,res){
		res.render('index', {
			title: 'Aluguel de imóveis',
			pontos: [
				['Faculdade Integrado', -24.0458588,-52.3815836],
				['Paraná Supermercados', -24.0455129,-52.3748619],
				['Casa',-24.0252581,-52.3599262],
				['Casa Lar Paraná',-24.0506678,-52.399078]
			]
		});
	});

	app.get('/imoveis', imovelController.show);
	app.get('/interno/imovel/novo', imovelController.novo);
	app.post('/interno/imovel/novo', function(req,res){
		res.json(req.body);
	});

}