const db = require("../models");
// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
      db.Recipe
      .find(req.query)      
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },

  find: function (req, res) {
    db.Recipe
      .find({email: req.query.email})
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },
  findById: function(req, res) {
    db.Recipe
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },
  create: function (req, res) {
    db.Recipe
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  },
  remove: function(req, res) {
    db.Recipe
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.error(err)
        res.status(422).json(err)
      });
  }
};