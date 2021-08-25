const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const { includes } = require("lodash");
// const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

//show products
async function index(req, res) {
  const products = await Product.findAll({ include: Category });
  res.json(products);
}

async function showByCategory(req, res) {
  const category = await Category.findOne({
    where: { name: req.params.category },
  });
  const products = await Product.findAll({
    where: { categoryId: category.id },
  });
  res.json(products);
}

//consultar como funciona la busqueda por slug
async function show(req, res) {
  const products = await Product.findOne({ where: { slug: req.params.slug } });
  if (products) {
    statuscode = 200;
    res.json(products);
  } else {
    statuscode = 404;
    res.send("Product not found");
  }
}

async function store(req, res) {
  const {
    name,
    description,
    details,
    characteristics,
    warranty,
    delivery,
    picture_url,
    picture_2_url,
    price,
    stock,
    stared,
    slug,
    categoryId,
  } = req.body;
  const [product, created] = await Product.findOrCreate({
    where: {
      name: name,
    },
    defaults: req.body,
  });
  if (created) {
    res.statuscode = 200;
    res.send("Product created");
    //que muestre algun cartel tipo toastify con que se agregó/modificó un producto
    res.redirect("/productos");
  } else {
    res.statuscode = 404;
    res.send("Error - Product not created. Please check data");
  }
}

async function update(req, res) {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.statuscode = 200;
    res.send("Product updated");
    //que muestre algun cartel tipo toastify con que se agregó/modificó un producto
  } catch (err) {
    res.statuscode = 404;
    res.send("Error 404 - Please check data");
  }
}

//de donde obtenemos el params.id para borrar, desde el front?.
async function destroy(req, res) {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    res.statuscode = 200;
    res.send("Product was deleted");
  } catch {
    res.statuscode = 404;
    res.send("Error 404 - No se pudo completar");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  showByCategory,
};
