const { Product } = require("../models");
const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
	const products = await Product.findAll({});
	res.json(products);
}
async function show(req, res) {
	const products = await Product.findOne({ where: { slug: req.params.name } });
	if (products) {
		statuscode = 200;
		res.json(products);
	} else {
		statuscode = 404;
		res.send("Product not found");
	}
}
async function store(req, res) {
	// const { firstname, lastname, email, password, roleId } = req.body;
	// const [product, created] = await Product.findOrCreate({
	// 	where: {
	// 		email: email,
	// 	},
	// 	defaults: {
	// 		name: firstname,
	// 		lastname: lastname,
	// 		email: email,
	// 		password: password,
	// 		roleId: roleId,
	// 	},
	// });
}
async function update(req, res) {
	// try {
	// 	const product = await Product.update(req.body, { where: { id: req.params.id } });
	// 	res.statuscode = 200;
	// 	res.send("Product updated");
	// } catch (err) {
	// 	res.statuscode = 404;
	// 	res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	// }
}
async function destroy(req, res) {
	// try {
	// 	const product = await Product.destroy({ where: { id: req.params.id } });
	// 	res.statuscode = 200;
	// 	res.send("Product deleted");
	// } catch {
	// 	res.statuscode = 404;
	// 	res.send("Error 404 - No se pudo completar");
	// }
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
