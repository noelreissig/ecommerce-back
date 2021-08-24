const { Category } = require("../models");
// const { Op } = require("sequelize");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
  const categories = await Category.findAll({});
  res.json(categories);
}
async function show(req, res) {
  const categories = await Category.findOne({
    where: { name: req.params.name },
  });
  if (categories) {
    statuscode = 200;
    res.json(categories);
  } else {
    statuscode = 404;
    res.send("Category not found");
  }
}
async function store(req, res) {
  const { name, photo_url } = req.body;
  const [category, created] = await Category.findOrCreate({
    where: {
      name: name,
    },
    default: {
      photo_url: photo_url,
    },
  });
  if (created) {
    res.statuscode = 200;
    res.send("Category created");
  } else {
    res.statuscode = 404;
    res.send("Error - Category not created. Please check data");
  }
}
async function update(req, res) {
  try {
    const response = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    console.log("Estoy en back", req.body);

    res.statuscode = 200;
    res.send("Contenido actualizado");
  } catch (err) {
    res.statuscode = 404;
    res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
  }
}
async function destroy(req, res) {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.statuscode = 200;
    res.send("Categoría eliminada");
  } catch {
    res.statuscode = 404;
    res.send("Error 404 - No se pudo eliminar");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
