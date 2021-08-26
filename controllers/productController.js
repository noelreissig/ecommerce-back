const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const { includes } = require("lodash");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");

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

//create de productos
async function store(req, res) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  const [product, created] = await Product.create(
    {
      name: fields.name,
      description: fields.description,
      details: fields.details,
      picture_url: file.picture_url.name,
      picture_2_url: file.picture_2_url.name,
      price: fields.price,
      stock: fields.stock,
      stared: fields.stared,
      slug: fields.slug,
    },
    { new: true }
  );

  if (created) {
    res.statuscode = 200;
    res.send("Product created");
    //que muestre algun cartel tipo toastify con que se agregó/modificó un producto
    res.redirect("/productos");
  } else {
    res.statuscode = 404;
    res.send("Error - Product not created. Please check data");
  }

  const supabase = createClient(
    "https://tyentfaqbpgmuskfbnwk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI5NzI1NzAwLCJleHAiOjE5NDUzMDE3MDB9.TrC1BuWa09EQc9ENGnwn6S3C12_3_wUfXFp9KkjWUeA"
  );

  const { data, error } = await supabase.storage
    .from("ecommerce")
    .upload(`images/${files.picture_url.name}`, files.picture_url, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(data);
  console.log(error);
  res.json(product);

  // const {
  //   name,
  //   description,
  //   details,
  //   characteristics,
  //   warranty,
  //   delivery,
  //   picture_url,
  //   picture_2_url,
  //   price,
  //   stock,
  //   stared,
  //   slug,
  //   categoryId,
  // } = req.body;

  // const [product, created] = await Product.findOrCreate({
  //   where: {
  //     name: name,
  //   },
  //   defaults: req.body,
  // });

  // if (created) {
  //   res.statuscode = 200;
  //   res.send("Product created");
  //   //que muestre algun cartel tipo toastify con que se agregó/modificó un producto
  //   res.redirect("/productos");
  // } else {
  //   res.statuscode = 404;
  //   res.send("Error - Product not created. Please check data");
  // }
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
