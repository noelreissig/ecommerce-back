const express = require("express");
const productRouter = express.Router();

const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
  secret: process.env.TOKEN_KEY,
  algorithms: ["HS256"],
});

productRouter.get("/api/product", productController.index);
productRouter.get("/api/product/:name", productController.show);
productRouter.post("/api/product", checkToken, productController.store);
productRouter.patch("/api/product/:id", checkToken, productController.update);
productRouter.delete("/api/product/:id", checkToken, productController.destroy);

module.exports = productRouter;