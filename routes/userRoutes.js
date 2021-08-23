const express = require("express");
const userRouter = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
	secret: process.env.TOKEN_KEY,
	algorithms: ["HS256"],
});

userRouter.post("/api/tokens", authController.tokens);

// CRUD Client User
userRouter.get("/api/users", userController.index);
userRouter.get("/api/users/:id", userController.show);
userRouter.post("/api/users", userController.store);
userRouter.patch("/api/users", checkToken, userController.update);
userRouter.delete("/api/users/:id", checkToken, userController.destroy);

module.exports = userRouter;
