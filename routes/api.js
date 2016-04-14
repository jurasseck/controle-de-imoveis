module.exports = function(app){

	app.get('/api/teste', function(req,res){
		res.json('OK');
	});

}