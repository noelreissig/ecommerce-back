// module.exports = {
//   checkSession: (req, res, next) => {
//     if (req.isAuthenticated()) {
//       next();
//     } else {
//       res.redirect("/index");
//     }
//   },
// };
const jwt = require("jsonwebtoken");

const checkSession = (req, res, next) => {
	const tokenBearer = req.headers["authorization"];
	const bearer = tokenBearer.split(" ");
	const token = bearer[1];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = checkSession;
