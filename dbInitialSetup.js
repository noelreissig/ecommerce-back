const db = require("./models");

module.exports = async () => {
  // Crear tablas:
  await db.sequelize.sync({ force: true });
  console.log(`Conexion establecida en el puerto ${process.env.APP_PORT}`);
  console.log("[Database] ¡Las tablas fueron creadas!");

  // Ejecutar seeders (datos de prueba):
  // await require("./seeders/roleSeeder")();
  // await require("./seeders/userSeeder")();
  // await require("./seeders/articleSeeder")();
  // await require("./seeders/commentSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
