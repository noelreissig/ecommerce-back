const express = require("express");
const orderRouter = express.Router();

const orderController = require("../controllers/orderController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
	secret: process.env.TOKEN_KEY,
	algorithms: ["HS256"],
});

// CRUD Admin User
orderRouter.get("/api/order", checkToken, orderController.index);
orderRouter.get("/api/order/:id", checkToken, orderController.show);
orderRouter.post("/api/order", checkToken, orderController.store);
orderRouter.patch("/api/order", checkToken, orderController.update);
orderRouter.delete("/api/order/:id", checkToken, orderController.destroy);

module.exports = orderRouter;
