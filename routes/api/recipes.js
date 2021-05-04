const router = require("express").Router();
const recipesController = require("../../controllers/recipescontroller");
console.log("inside routes"); 

  router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

module.exports = router;
