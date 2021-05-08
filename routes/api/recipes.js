const router = require("express").Router();
const recipesController = require("../../controllers/recipescontroller");

  router.route("/")
  .get(recipesController.find)
  .post(recipesController.create);

router
  .route("/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

module.exports = router;
