const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  
  register: function (req, res) {
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
      req.session.destroy();
      res.clearCookie('connect.sid'); 
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		next();
  },
  authenticate: (req, res) => {
		const user = JSON.parse(JSON.stringify(req.user));
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
	}
};