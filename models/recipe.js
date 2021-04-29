const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
  _id: { type: String },
  title: { type: String },
  image: { type: String },
  imageType: { type: String },
  link: { type: String },
  nutrition: [{
    title: { type: String },
    amount: { type: Number },
    unit: { type: String }
  }]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
