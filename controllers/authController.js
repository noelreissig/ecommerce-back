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

const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function tokens(req, res) {
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
module.exports = {
	tokens,
};
