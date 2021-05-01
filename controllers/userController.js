const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  // register: (req, res) => {
  //   console.log("Inside register: ", req.body);
  //   const { firstName, lastName, email, password } = req.body;
  //   // ADD VALIDATION
  //   // db.User.findOne({ 'email': email }, (err, userMatch) => {
  //   //   if (userMatch) {
  //   //     return res.json({
  //   //       error: `Sorry, already a user with the username: ${email}`
  //   //     });
  //   //   }
  //     const newUser = new db.User({
  //       'firstName': firstName,
  //       'lastName': lastName,
  //       'email': email,
  //       'password': password
  //     });
  //     newUser.save((err, savedUser) => {
  //       if (err) return res.json(err);
  //       return res.json(savedUser);
  //     });
  //   // });
  // },

  register: function (req, res) {
    console.log("inside create: ", req.body)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },
  logout: (req, res) => {
    if (req.user) {
      console.log("Logout");
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};