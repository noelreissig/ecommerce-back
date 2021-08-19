// const express = require("express");
// const adminRouter = express.Router();
// const adminController = require("../controllers/adminController");
// const authController = require("../controllers/authController");

// const ensure = require("../middlewares/ensureAuthenticated");
// //const { m1, m2, m3}=req(carpeta)

// const available = require("../middlewares/userAvailable");
// const {
// 	checkAdmin,
// 	checkEditor,
// 	checkWriter,
// 	checkReader,
// } = require("../middlewares/checkRol");

// adminRouter.use(ensure);
// adminRouter.use(available);
// adminRouter.get("/", adminController.showAdmin);
// adminRouter.get("/create", checkWriter, adminController.showCreate);
// adminRouter.post("/create", checkWriter, adminController.store);
// adminRouter.get("/update/:id", checkWriter, adminController.showUpdate);
// adminRouter.post("/update/:id", checkWriter, adminController.update);
// adminRouter.get("/delete/:id", checkEditor, adminController.destroy);
// adminRouter.get("/updateUser/:id", checkAdmin, authController.showUserUpdate);
// adminRouter.post("/updateUser/:id", checkAdmin, authController.userUpdate);
// // Rutas del Admin:

// module.exports = adminRouter;
