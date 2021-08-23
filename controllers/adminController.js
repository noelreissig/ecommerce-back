// const { create } = require("lodash");
const { Admin } = require("../models");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
	const admins = await Admin.findAll({});
	res.json(admins);
}
async function show(req, res) {
	const admin = await Admin.findByPk(req.params.id);
	if (admin) {
		statuscode = 200;
		res.json(admin);
	} else {
		statuscode = 404;
		res.send("Usuario no encontrado");
	}
}
async function store(req, res) {
	const { firstname, lastname, email, password } = req.body;
	const [admin, created] = await Admin.findOrCreate({
		where: {
			email: email,
		},
		defaults: {
			firstname: firstname,
			lastname: lastname,
			password: password,
		},
	});
	if (created) {
		res.statuscode = 200;
		res.send("Admin created");
	} else {
		res.statuscode = 404;
		res.send("Error - Admin not created. Please check data");
	}
}

async function update(req, res) {
	try {
		await Admin.update(req.body, { where: { id: req.admin.id } });
		res.statuscode = 200;
		res.send("Admin updated");
	} catch (err) {
		res.statuscode = 404;
		res.send("Error 404 - Admin not updated. Please check data");
	}
}
async function destroy(req, res) {
	try {
		await Admin.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Admin deleted");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - Admin not deleted. Please check data");
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
