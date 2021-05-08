import axios from "axios";
import { convertNodeToElement } from "react-html-parser";

const apiKey = 'd8de6f34acff4ea89755be40ac8a5ca7';
export default {
  getRecipe: function (query) {
    console.log("Get reicpe API hit ", query) 
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInformation=true&number=5`)
  },
  // Deletes the book with the given id
  deleteRecipe: function (id) {
    console.log("deleting recipe id: ", id)
    return axios.delete("/api/recipes/" + id).then(result => result.data);
  },
  // Saves a book to the database
  saveRecipe: function (recipeData) {
    console.log("saving recipe: ", recipeData)
    return axios.post("/api/recipes", recipeData).then(result => result.data);
  },
  // Get the saved a books from the database
  savedRecipes: function (email) {
    console.log("saved recipes: ", email)
    return axios.get(`/api/recipes?email=${email}`).then(result => result.data);
  }
};
