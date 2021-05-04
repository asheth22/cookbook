const db = require('../models');
const LocalStrategy = require('passport-local').Strategy;
console.log("inside local strategy")

const strategy = new LocalStrategy(
	{
		usernameField: 'email' // not necessary, DEFAULT
	},
	function(email, password, done) {
		db.User.findOne({ 'email': email }, (err, userMatch) => {
			console.log("inside ls-findone: ", email)
			if (err) {
				return done(err);
			}
			if (!userMatch) {
				console.log("incorrect email")
				return done(null, false, { message: 'Incorrect email' });
			}
			if (!userMatch.checkPassword(password)) {
				console.log("incorrect password")
				return done(null, false, { message: 'Incorrect password' });
			}
			console.log("user matched: ", userMatch)
			return done(null, userMatch);
		});
	}
);

module.exports = strategy;
