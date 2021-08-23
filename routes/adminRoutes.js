const express = require("express");
const adminRouter = express.Router();

const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
	secret: process.env.TOKEN_KEY,
	algorithms: ["HS256"],
});

adminRouter.post("/api/tokens", authController.tokens);

// CRUD Admin User
adminRouter.get("/api/admin", checkToken, adminController.index);
adminRouter.get("/api/admin/:id", checkToken, adminController.show);
adminRouter.post("/api/admin", checkToken, adminController.store);
adminRouter.patch("/api/admin", checkToken, adminController.update);
adminRouter.delete("/api/admin/:id", checkToken, adminController.destroy);

module.exports = adminRouter;
