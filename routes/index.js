// const publicRoutes = require("./publicRoutes");
// const adminRoutes = require("./adminRoutes");
const apiRoutes = require("./apiRoutes");
const adminRoutes = require("./adminRoutes");
const userRouter = require("./userRoutes");

module.exports = (app) => {
	// app.use("/admin", adminRoutes);
	app.use(apiRoutes);
	app.use(adminRoutes);
	app.use(userRouter);
};
