const express = require("express");
const apiRouter = express.Router();

const checkJwt = require("express-jwt");
// const checkToken = checkJwt({
//   secret: process.env.TOKEN_KEY,
//   algorithms: ["HS256"],
// });

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// const adminController = require("../controllers/adminController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const categoryController = require("../controllers/categoryController");
// const adminRoutes = require("./adminRoutes");

// apiRouter.post("/api/tokens", authController.tokens);

//Maria NOel
// apiRouter.get("/api/product", productController.index); //anda
// apiRouter.get("/api/product/:name", productController.show); //anda
// apiRouter.post("/api/product", productController.store); //anda
// apiRouter.patch("/api/product/:id", productController.update);
// apiRouter.delete("/api/product/:id", productController.destroy); //anda

//Gabriel
// CRUD Client User
// apiRouter.get("/api/users", userController.index);
// apiRouter.get("/api/users/:id", userController.show);
// apiRouter.post("/api/users", userController.store);
// apiRouter.patch("/api/users", checkToken, userController.update);
// apiRouter.delete("/api/users/:id", checkToken, userController.destroy);

// CRUD Admin User
// apiRouter.use(adminRoutes);
// apiRouter.get("/api/admin", checkToken, adminController.index);
// apiRouter.get("/api/admin/:id", checkToken, adminController.show);
// apiRouter.post("/api/admin", checkToken, adminController.store);
// apiRouter.patch("/api/admin", checkToken, adminController.update);
// apiRouter.delete("/api/admin/:id", checkToken, adminController.destroy);

//todos
apiRouter.get("/api/order", orderController.index);
apiRouter.get("/api/order/:id", orderController.show);
apiRouter.post("/api/order", orderController.store);
apiRouter.patch("/api/order/:id", orderController.update);
apiRouter.delete("/api/order/:id", orderController.destroy);

//Anto
// apiRouter.get("/api/category", categoryController.index); // Funciona
// apiRouter.get("/api/category/:name", categoryController.show); // Funciona
// apiRouter.post("/api/category", categoryController.store); // Funciona
// apiRouter.patch("/api/category/:id", categoryController.update); // Funciona
// apiRouter.delete("/api/category/:id", categoryController.destroy); // FUnciona

module.exports = apiRouter;

// apiRouter.get("/api/articulos/author/:id", apiController.searchAuthorApi);
// apiRouter.get("/api/articulos/searchLike/:search", apiController.searchLikeApi);
