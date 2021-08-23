const express = require("express");
const categoryRouter = express.Router();

const authController = require("../controllers/authController");
const categoryController = require("../controllers/categoryController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
  secret: process.env.TOKEN_KEY,
  algorithms: ["HS256"],
});

categoryRouter.post("/api/tokens", authController.tokens);

categoryRouter.get("/api/category", categoryController.index); // Funciona
categoryRouter.get("/api/category/:name", categoryController.show); // Funciona
categoryRouter.post("/api/category", categoryController.store); // Funciona
categoryRouter.patch(
  "/api/category/:id",

  categoryController.update
); // Funciona
categoryRouter.delete(
  "/api/category/:id",
  categoryController.destroy
); // FUnciona

module.exports = categoryRouter;
