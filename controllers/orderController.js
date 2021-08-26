const { Order, Product, Order_Product } = require("../models");
// const { Op } = require("sequelize");

async function index(req, res) {
	const orders = await Order.findAll({});
	res.json(orders);
}
async function show(req, res) {
	const orders = await Order.findByPk(req.params.id, {
		include: { model: Product },
	});
	if (orders) {
		statuscode = 200;
		res.json(orders);
	} else {
		statuscode = 404;
		res.send("Orden no encontrada");
	}
}
async function store(req, res) {
	try {
		const { products, deliveryAddress, deliveryDate, userId } = req.body;
		const order = await Order.create({
			deliveryAddress: deliveryAddress,
			deliveryDate: deliveryDate,
			userId: userId,
		});
		products.map(async (item) => {
			await order.addProduct(item.prod.id, {
				through: { quantity: item.quantity, unitPrice: item.prod.price },
			});
		});
		statuscode = 200;
		res.send("Orden Creada");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}

//LETRA: Los pedidos no se podran modificar una vez hechos
async function update(req, res) {
	// 	// try {
	// 	// 	const order = await Order.update(req.body, { where: { id: req.params.id } });
	// 	// 	res.statuscode = 200;
	// 	// 	res.send("Contenido actualizado");
	// 	// } catch (err) {
	// 	// 	res.statuscode = 404;
	// 	// 	res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	// 	// }
}
async function destroy(req, res) {
	try {
		const order = await Order.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Orden eliminada");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}

module.exports = {
	show,
	index,
	store,
	update,
	destroy,
};
