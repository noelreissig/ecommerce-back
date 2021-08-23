const { Admin } = require("../models");
dbAdmin = require("./DBdata/dbAdmin.json");
module.exports = async () => {
	await Admin.bulkCreate(dbAdmin);
	console.log("[Database] Se corrió el seeder de Admin.");
};

// Hash 'password'
//$2a$10$HG4x9a3HErfl0H450ajx9eEym8Hk5rzwIN513LUO.Jf9yIIu4.IU2
