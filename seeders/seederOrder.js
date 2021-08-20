const { Order } = require("../models");
dbOrder = require("./DBdata/dbOrder.json");

module.exports = async () => {
	await Order.bulkCreate(dbOrder);
	console.log("[Database] Se corrió el seeder de Orders.");
};
