const { Article, User, Comment } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const checkJwt = require("express-jwt");
let apiKey = "";

async function articleShow(req, res) {
	const articles = await Article.findAll({});
	res.json(articles);
}
async function showArticlesId(req, res) {
	const articles = await Article.findByPk(req.params.id);
	statuscode = 200;
	if (articles) {
		res.json(articles);
	} else {
		statuscode = 404;
		res.send("articulo no encontrado");
	}
}
async function articleStore(req, res) {
	const form = formidable({
		multiples: true,
		uploadDir: __dirname + "/../public/img",
		keepExtensions: true,
	});

	form.parse(req, async (err, fields, files) => {
		const articleData = fields;
		articleData.image = "/img/" + path.basename(files.image.path);
		console.log(articleData);
		await Article.create({
			title: articleData.title,
			content: articleData.content,
			image: articleData.image,
			userId: articleData.userId,
		});
		console.log("termino");
		// sendMail(html);
		res.redirect("/admin");
	});
}
async function articleUpdate(req, res) {
	try {
		const { title, content, user } = req.body;
		const articles = await Article.update(
			{
				title: title,
				content: content,
				userId: user,
			},
			{ where: { id: req.params.id } }
		);
		res.statuscode = 200;
		res.send("Contenido actualizado");
	} catch (err) {
		if (
			err.message === "Validation error: empty title" ||
			err.message === "Validation error: empty content"
		) {
			res.statuscode = 404;
			res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
		}
	}
}
async function articleDestroy(req, res) {
	try {
		const articles = await Article.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Contenido eliminado");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}
async function searchAuthorApi(req, res) {
	const articles = await Article.findAll({ where: { userId: req.params.id } });
	res.json(articles);
}
async function searchLikeApi(req, res) {
	const articles = await Article.findAll({
		where: { title: { [Op.like]: `%${req.params.search}%` } },
	});
	res.json(articles);
}

async function userShow(req, res) {
	const users = await User.findAll({});
	res.json(users);
}
async function userShowId(req, res) {
	const users = await User.findByPk(req.params.id);
	if (users) {
		statuscode = 200;
		res.json(users);
	} else {
		statuscode = 404;
		res.send("Usuario no encontrado");
	}
}
async function userStore(req, res) {
	const { firstname, lastname, email, password, roleId } = req.body;
	const [user, created] = await User.findOrCreate({
		where: {
			email: email,
		},
		defaults: {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			roleId: roleId,
		},
	});
}
async function userUpdate(req, res) {
	try {
		const user = await User.update(req.body, { where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Contenido actualizado");
	} catch (err) {
		res.statuscode = 404;
		res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	}
}
async function userDestroy(req, res) {
	try {
		const user = await User.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Usuario eliminado");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}

async function commentShow(req, res) {
	const comments = await Comment.findAll({});
	res.json(comments);
}
async function commentShowId(req, res) {
	const comments = await Comment.findByPk(req.params.id);
	if (comments) {
		statuscode = 200;
		res.json(comments);
	} else {
		statuscode = 404;
		res.send("Usuario no encontrado");
	}
}
async function commentStore(req, res) {
	const { firstname, lastname, email, password, roleId } = req.body;
	const [comment, created] = await Comment.findOrCreate({
		where: {
			email: email,
		},
		defaults: {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password,
			roleId: roleId,
		},
	});
}
async function commentUpdate(req, res) {
	try {
		const comment = await Comment.update(req.body, { where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Contenido actualizado");
	} catch (err) {
		res.statuscode = 404;
		res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
	}
}
async function commentDestroy(req, res) {
	try {
		const comment = await Comment.destroy({ where: { id: req.params.id } });
		res.statuscode = 200;
		res.send("Usuario eliminado");
	} catch {
		res.statuscode = 404;
		res.send("Error 404 - No se pudo completar");
	}
}
async function apiKeyCreate(req, res) {
	const token = jwt.sign(
		{
			given_name: req.user.firstname,
			family_name: req.user.lastname,
			email: req.user.email,
		},
		`${process.env.API_JWT_SECRET}`
	);
	// console.log(token);

	// checkJwt({ secret: `${process.env.API_JWT_SECRET}`, algorithms: ["HS256"] });
	// const apiKey = await ApiKey.Create({
	// 	userId: req.user.id,
	// 	userKey: token,
	// });

	// checkJwt({ secret: `${process.env.API_JWT_SECRET}`, algorithms: ["HS256"] });
	res.json({
		mensaje: "Autenticación correcta",
		token: token,
	});
}
module.exports = {
	apiKeyCreate,
	articleShow,
	showArticlesId,
	articleStore,
	articleUpdate,
	articleDestroy,
	searchAuthorApi,
	searchLikeApi,
	userShow,
	userShowId,
	userStore,
	userUpdate,
	userDestroy,
	commentShow,
	commentShowId,
	commentStore,
	commentUpdate,
	commentDestroy,
	apiKey,
};
