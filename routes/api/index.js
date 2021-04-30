const router = require("express").Router();
// const bookRoutes = require("./books");
const recipeRoutes = require("./books");

// Book routes
// router.use("/books", bookRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
