const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function index(req, res) {
	const users = await User.findAll({});
	res.json(users);
}
async function show(req, res) {
	const users = await User.findByPk(req.params.id);
	if (users) {
		res.status(200).json(users);
	} else {
		res.status(404).json({ Message: "Error 404 - User not found" });
	}
}
async function store(req, res) {
	const {
		firstname,
		lastname,
		address,
		city,
		department,
		postalcod,
		phone,
		email,
		password,
	} = req.body;
	const [user, created] = await User.findOrCreate({
		where: {
			email: email,
		},
		defaults: {
			firstname: firstname,
			lastname: lastname,
			address: address,
			city: city,
			department: department,
			postalcod: postalcod,
			phone: phone,
			password: password,
		},
	});
	if (created) {
		const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_KEY);
		await User.update(
			{
				token: token,
			},
			{ where: { email: email } }
		);
		user.save();
		const newUser = await User.findOne({
			where: { email: email },
			attributes: { exclude: ["password"] },
		});
		res.status(200).json(newUser);
	} else {
		res.status(404).json({
			Message: "Error - User not created. Please check data",
		});
	}
}

async function update(req, res) {
	try {
		await User.update(req.body, { where: { id: req.user.id } });
		res.status(200).json({ Message: "User updated" });
	} catch (err) {
		res.status(404).json({
			Message: "Error - User not updated. Please check data",
		});
	}
}

async function destroy(req, res) {
	try {
		await User.destroy({ where: { id: req.params.id } });
		res.status(200).json({ Message: "User deleted" });
	} catch {
		res.status(404).json({ Message: "Error - User not deleted." });
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
