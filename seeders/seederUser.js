const { User } = require("../models");
dbUser = require("./DBdata/dbUser.json");
module.exports = async () => {
	await User.bulkCreate(dbUser);
	console.log("[Database] Se corrió el seeder de User.");
};
