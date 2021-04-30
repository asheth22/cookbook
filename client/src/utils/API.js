import axios from "axios";

const apiKey = 'd8de6f34acff4ea89755be40ac8a5ca7';
export default {
  getRecipe: function (query) {
    console.log("Get reicpe hit")
    // return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=pasta&addRecipeInformation=true&number=5`)
  },
  // Deletes the book with the given id
  deleteRecipe: function (id) {
    return axios.delete("/api/recipes/" + id).then(result => result.data);
  },
  // Saves a book to the database
  saveRecipe: function (bookData) {
    return axios.post("/api/recipes", bookData).then(result => result.data);
  },
  // Get the saved a books from the database
  savedRecipes: function () {
    return axios.get("/api/recipes").then(result => result.data);
  }
};
