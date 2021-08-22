// const publicRoutes = require("./publicRoutes");
// const adminRoutes = require("./adminRoutes");
const apiRoutes = require("./apiRoutes");

module.exports = (app) => {
  // app.use("/admin", adminRoutes);
  app.use(apiRoutes);
};
