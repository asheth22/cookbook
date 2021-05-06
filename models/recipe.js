const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    _id: { type: String },    
    title: { type: String },
    image: { type: String },   
    summary: { type: String },    
    sourceURL: { type: String },
    email: { type: String },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
