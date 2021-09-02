const { Product } = require("../models");
dbProduct = require("./DBdata/dbProduct.json");

module.exports = async () => {
	try {
		await Product.bulkCreate(dbProduct);
		console.log("[Database] Se corrió el seeder de Product.");
	} catch (error) {
		console.log(error);
	}
};
