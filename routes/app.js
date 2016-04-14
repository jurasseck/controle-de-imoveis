module.exports = function(app){

	app.get('/',function(req,res){
		res.render('index', {
			title: 'Imobiliaria do Luis'
		});
	});

}