const express = require("express");
const app = express();
const db = require("./models");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session")
const PORT = process.env.PORT || 3001;

// require("./config/passport")(passport)
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(passport.initialize());
app.use(passport.session());

// app.use(morgan('common'))

// THIS IS REALLY IMPORTANT FOR ROUTING CLIENT SIDE
// We want to have our app to use the build directory 
app.use(express.static(__dirname + '/client/build'))
// Define API routes here
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recipes",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
