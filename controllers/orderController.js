const { Order, Product, User } = require("../models");
// const { Op } = require("sequelize");

async function index(req, res) {
	const orders = await Order.findAll({
		include: [{ model: Product }, { model: User }],
	});
	res.status(200).json(orders);
}
async function show(req, res) {
	const orders = await Order.findOne({
		where: { userId: req.params.id },

		include: [{ model: Product }, { model: User }],
	});
	if (orders) {
		res.status(200).json(orders);
	} else {
		res.status(404).json({ Message: "Orden not found" });
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
		res.status(200).json({ Message: "Order Created" });
	} catch {
		res.status(404).json({ Message: "Error - Order not Created" });
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
		await Order.destroy({ where: { id: req.params.id } });
		res.status(200).json({ Message: "Order deleted" });
	} catch {
		res.status(404).json({ Message: "Error - Order not deleted" });
	}
}

module.exports = {
	show,
	index,
	store,
	update,
	destroy,
};
