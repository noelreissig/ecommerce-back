const db = require("./models");

module.exports = async () => {
	// Crear tablas:
	await db.sequelize.sync({ force: true });
	console.log(`Conexion establecida en el puerto ${process.env.APP_PORT}`);
	console.log("[Database] ¡Las tablas fueron creadas!");

	// Ejecutar seeders (datos de prueba):
	await require("./seeders/seederCategory")();
	await require("./seeders/seederProduct")();
	await require("./seeders/seederUser")();
	await require("./seeders/seederOrder")();
	await require("./seeders/seederOrder_Product")();

	console.log("[Database] ¡Los datos de prueba fueron insertados!");
};
