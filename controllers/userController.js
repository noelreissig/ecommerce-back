const { User } = require("../models");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
	const users = await User.findAll({});
	res.json(users);
}
async function show(req, res) {
	const users = await User.findByPk(req.params.id);
	if (users) {
		statuscode = 200;
		res.json(users);
	} else {
		statuscode = 404;
		res.send("Usuario no encontrado");
	}
}
async function store(req, res) {
	// const { firstname, lastname, email, password, roleId } = req.body;
	// const [user, created] = await User.findOrCreate({
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
	// 	const user = await User.update(req.body, { where: { id: req.params.id } });
	// 	res.statuscode = 200;
	// 	res.send("Contenido actualizado");
	// } catch (err) {
	// 	res.statuscode = 404;
	// 	res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	// }
}
async function destroy(req, res) {
	try {
		const user = await User.destroy({ where: { id: req.params.id } });
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
