var mongoose = require('mongoose');

module.exports = function(dbURL){

	mongoose.connect(dbURL);

	mongoose.connection.on('connected', function(){
		console.log('Banco de dados conectado -> ' + dbURL);
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Banco de dados desconectado!');
	});

	mongoose.connection.on('error', function(error){
		console.error('ERRO: ' + error);
	});

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Mongoose, desconectado pelo termino da app');
			process.exit(0);
		});
	});
}