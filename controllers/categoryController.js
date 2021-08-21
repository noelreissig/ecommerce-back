const { Category } = require("../models");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
	const categories = await Category.findAll({});
	res.json(categories);
}
async function show(req, res) {
	const categories = await Category.findOne({ where: { name: req.params.name } });
	if (categories) {
		statuscode = 200;
		res.json(categories);
	} else {
		statuscode = 404;
		res.send("Category not found");
	}
}
async function store(req, res) {
	// const { firstname, lastname, email, password, roleId } = req.body;
	// const [category, created] = await Category.findOrCreate({
	// 	where: {
	// 		email: email,
	// 	},
	// 	defaults: {
	// 		firstname: firstname,
	// 		lastname: lastname,
	// 		email: email,
	// 		password: password,
	// 		roleId: roleId,
	// 	},
	// });
}
async function update(req, res) {
	// try {
	// 	const category = await Category.update(req.body, { where: { id: req.params.id } });
	// 	res.statuscode = 200;
	// 	res.send("Contenido actualizado");
	// } catch (err) {
	// 	res.statuscode = 404;
	// 	res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	// }
}
async function destroy(req, res) {
	try {
		const category = await Category.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Usuario eliminado");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
