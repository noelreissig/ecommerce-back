const express = require("express");
const categoryRouter = express.Router();

const categoryController = require("../controllers/categoryController");

const checkJwt = require("express-jwt");
const checkToken = checkJwt({
	secret: process.env.TOKEN_KEY,
	algorithms: ["HS256"],
});

categoryRouter.get("/api/category", categoryController.index);
categoryRouter.get("/api/category/:name", categoryController.show);
categoryRouter.post("/api/category", checkToken, categoryController.store);
categoryRouter.patch("/api/category/:id", categoryController.update);
categoryRouter.delete("/api/category/:id", checkToken, categoryController.destroy);

module.exports = categoryRouter;
