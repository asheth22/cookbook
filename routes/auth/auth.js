const router = require("express").Router();
const passport = require('../../passport');
const userController = require("../../controllers/userController");

// this route is just used to get the user basic info
router.route("/user")
.get(userController.getUser)

router.route('/login')
    .post(passport.authenticate('local'), userController.authenticate);

router.route('/logout')
    .post(userController.logout);

router.route("/signup")
.post(userController.register);

module.exports = router;
