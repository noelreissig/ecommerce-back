// const publicRoutes = require("./publicRoutes");
// const adminRoutes = require("./adminRoutes");

const apiRoutes = require("./apiRoutes");
const adminRoutes = require("./adminRoutes");
const userRouter = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const authController = require("../controllers/authController");

module.exports = (app) => {
  // app.use("/admin", adminRoutes);
  app.post("/api/tokens", authController.tokens);
  app.use(apiRoutes);
  app.use(adminRoutes);
  app.use(userRouter);
  app.use(categoryRoutes);
  app.use(productRoutes);
};
