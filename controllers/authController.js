// Ruta login POST
// const passport = require("passport");

// module.exports = {
// 	login: passport.authenticate("local", {
// 		successRedirect: "/",
// 		failureRedirect: "/login",
// 	}),
// 	// Ruta inicio de sesion POST

// };
// Ruta login POST

const { User, Admin } = require("../models");
const jwt = require("jsonwebtoken");

async function tokenUsers(req, res) {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		let user = await User.findOne({ where: { email: email } });
		if (await user.validPassword(password)) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.TOKEN_KEY
			);
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
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
	}
}
async function tokenAdmin(req, res) {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		let user = await Admin.findOne({ where: { email: email } });
		if (await user.validPassword(password)) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.TOKEN_KEY
			);
			await Admin.update(
				{
					token: token,
				},
				{ where: { email: email } }
			);
			user.save();
			const newAdmin = await Admin.findOne({
				where: { email: email },
				attributes: { exclude: ["password"] },
			});
			res.status(200).json(newAdmin);
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
	}
}
module.exports = {
	tokenUsers,
	tokenAdmin,
};
