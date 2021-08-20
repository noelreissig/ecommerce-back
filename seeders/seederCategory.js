const { Category } = require("../models");
dbCategory = require("./DBdata/dbCategory.json");

module.exports = async () => {
	await Category.bulkCreate(dbCategory);
	console.log("[Database] Se corrió el seeder de Category.");
};
