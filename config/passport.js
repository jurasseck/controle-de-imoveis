var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		User.findById(user._id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local', new LocalStrategy(function(username, password, done){
		process.nextTick(function(){
			var q = {'access.username': username};
			User.findOne(q,function(err,user){

				if (err) return done(err);
				if (!user) return done(null,false);
				if (user.access.password != password)  return done(null,false);

				return done(null,user);
			});
		});
	}));
}