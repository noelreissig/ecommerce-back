const express = require("express");
const apiRouter = express.Router();

// const passport = require("passport");
const checkJwt = require("express-jwt");
const checkToken = checkJwt({
	secret: process.env.TOKEN_KEY,
	algorithms: ["HS256"],
});

// const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const categoryController = require("../controllers/categoryController");

// const ensure = require("../middlewares/ensureAuthenticated");
// const redirect = require("../middlewares/redirectIfAuthenticated");

// apiRouter.get("/api/autenticar", ensure, apiController.apiKeyCreate);

// apiRouter.use(
// 	checkJwt({ secret: `${process.env.API_JWT_SECRET}`, algorithms: ["HS256"] })
// );

apiRouter.post("/api/tokens", authController.tokens);

//Maria NOel
apiRouter.get("/api/product", productController.index);
apiRouter.get("/api/product/:name", productController.show);
apiRouter.post("/api/product", productController.store);
apiRouter.patch("/api/product/:id", productController.update);
apiRouter.delete("/api/product/:id", productController.destroy);

// apiRouter.get("/api/articulos/author/:id", apiController.searchAuthorApi);
// apiRouter.get("/api/articulos/searchLike/:search", apiController.searchLikeApi);

//Gabriel
apiRouter.get("/api/users", userController.index);
apiRouter.get("/api/users/:id", userController.show);
apiRouter.post("/api/users", userController.store);
apiRouter.patch("/api/users/:id", checkToken, userController.update);
apiRouter.delete("/api/users/:id", checkToken, userController.destroy);

//todos
apiRouter.get("/api/order", orderController.index);
apiRouter.get("/api/order/:id", orderController.show);
apiRouter.post("/api/order", orderController.store);
apiRouter.patch("/api/order/:id", orderController.update);
apiRouter.delete("/api/order/:id", checkToken, orderController.destroy);

//Anto
apiRouter.get("/api/category", categoryController.index);
apiRouter.get("/api/category/:name", categoryController.show);
apiRouter.post("/api/category", categoryController.store);
apiRouter.patch("/api/category/:id", categoryController.update);
apiRouter.delete("/api/category/:id", categoryController.destroy);

module.exports = apiRouter;
