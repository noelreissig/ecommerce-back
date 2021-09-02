const { Admin } = require("../models");

async function index(req, res) {
	const admins = await Admin.findAll({});
	res.status(200).json(admins);
}
async function show(req, res) {
	const admin = await Admin.findByPk(req.params.id);
	if (admin) {
		res.status(200).json(admin);
	} else {
		res.status(401).json({ Message: "User Admin not found" });
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
		res.status(200).json({ Message: "Admin created" });
	} else {
		res.status(400).json({ Message: "Error - Admin not created. Please check data" });
	}
}

async function update(req, res) {
	try {
		await Admin.update(req.body, { where: { id: req.params.id } });
		res.status(200).json({ Message: "Admin updated" });
	} catch (err) {
		res.status(400).json({
			Message: "Error - Admin not updated. Please check data",
		});
	}
}
async function destroy(req, res) {
	try {
		await Admin.destroy({ where: { id: req.params.id } });
		res.status(200).json({ Message: "Admin deleted" });
	} catch {
		res.status(400).json({
			Message: "Error - Admin not deleted",
		});
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
