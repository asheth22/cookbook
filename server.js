const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
import http from "http";
import debug from "debug";
import { config } from "dotenv";
import app from "./app";
import './db/mongoose'

config();

const DEBUG = debug("dev");
const PORT = process.env.PORT || 3001;
const app = express();

const server = http.createServer(app);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  
process.on("uncaughtException", (error) => {
  DEBUG(`uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  DEBUG(err);
  DEBUG("Unhandled Rejection:", {
    name: err.name,
    message: err.message || err,
  });
  process.exit(1);
});

server.listen(PORT, () => {
  DEBUG(
    `server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});

// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });
