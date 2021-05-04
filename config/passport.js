// Passport Authentication. Need to use its methods
const passport = require("passport");

// Using Passport Local Strategy. Has methods specific to local login
const LocalStrategy = require("passport-local");

// Bring in models
const db = require("../models");

// Used to Hash password
const bcrypt = require("bcrypt");


module.exports = () => {

    // Signup
    passport.use('local-signup', new LocalStrategy({
        // => What do these do?
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            // Hash password using bcrypt method genSaltSync to synchronously generate a Salt. We will go through 10 rounds of salting
            var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

            // We will go through our User Model to see if an email with the same name exists
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {

                // If the user already exists, we will return a value of false. We can also add an additional message but that will be later on
                if (user) {
                    return done(null, false)

                } else {

                    var data = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: passwordHash,
                    }

                    console.log(`User data:`, data)

                    db.User.create(data)
                        .then(newUser => {

                            // If a new user was created, will return it back as a parameter for the callback done()
                            if (newUser) {
                                return done(null, newUser)

                            }

                            return done(null, false)

                        })

                }
            })
        }
    ))

    // Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {

            // This is a function that checks the login password against the database password for the email used. We use the bcrypt password compareSync to see if they are equal
            var isValidPassword = (userpass, password) => {
                return bcrypt.compareSync(password, userpass)
            }

            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {

                // Get User
                function getUser(user) {


                    if (!user) {
                        return done(null, false)
                    }

                    if (!isValidPassword(user.password, password)) {
                        return done(null, false)
                    }

                    // => What does this do? We know it logs in the user but how
                    var userInfo = user.get();
                    console.log("UserInfo")
                    console.log(userInfo)
                    return done(null, userInfo)
                }

                getUser(user)

            }).catch((err) => {
                console.log(err)
                // If this occurs, then there was something wrong with the login
                return done(null, false)
            })
        }


    ))

    // This is a function that takes in the user and callback function
    passport.serializeUser((user, cb) => {
        console.log(user)
        cb(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        console.log(id)
        // Look in database for a user with same id
        db.User.findOne({
            where: {
                id: id
            }
        }).then(user => {
            // callback function to pass back user if a user with a matching id is found
            cb(null, user)
        })
    })

}