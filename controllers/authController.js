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

const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function tokens(req, res) {
	try {
		// Get user input
		const { email, password } = req.body;
		// Validate user input
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		console.log(email, password);
		// 	// Validate if user exist in our database
		const user = await User.findOne({ where: { email: email } });
		// 	if (await user.validPassword(password)) {
		// 		// Create token
		const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_KEY);
		const newUser = await User.findByPk(user.id);
		newUser.token = token;
		res.status(200).json(newUser);
		// }
		// res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
	}
}
module.exports = {
	tokens,
};
