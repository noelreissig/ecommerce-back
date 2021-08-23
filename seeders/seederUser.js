const { User } = require("../models");
dbUser = require("./DBdata/dbUser.json");
module.exports = async () => {
	await User.bulkCreate(dbUser);
	console.log("[Database] Se corrió el seeder de User.");
};

// Hash 'password'
//$2a$10$HG4x9a3HErfl0H450ajx9eEym8Hk5rzwIN513LUO.Jf9yIIu4.IU2
