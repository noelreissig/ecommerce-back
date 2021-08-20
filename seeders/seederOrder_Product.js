const { Order_Product } = require("../models");
dbOrder_Product = require("./DBdata/dbOrder_Products.json");

module.exports = async () => {
	await Order_Product.bulkCreate(dbOrder_Product);
	console.log("[Database] Se corrió el seeder de Order_Product.");
};
