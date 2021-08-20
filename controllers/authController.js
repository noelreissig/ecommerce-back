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

async function login(req, res) {
	try {
		// Get user input
		const { username, password } = req.body;

		// Validate user input
		if (!(username && password)) {
			res.status(400).send("All input is required");
		}
		// Validate if user exist in our database
		const user = await User.findOne({
			$or: [{ email: username }, { username: username }],
		});
		if (await user.validPassword(password)) {
			// Create token
			const token = jwt.sign(
				{ sub: user._id, username: username },
				process.env.TOKEN_KEY
			);
			const newUser = await User.findById(user._id).select("-password");
			newUser.token = token;

			res.status(200).json(newUser);
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
	}
}
module.exports = {
	login,
	// logout: (req, res) => {
	//   req.logout();
	//   res.json(req.user);
	// },
};
