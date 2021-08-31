const { create } = require("lodash");
const { User } = require("../models");
// const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
// const checkJwt = require("express-jwt");
// let apiKey = "";

async function index(req, res) {
  const users = await User.findAll({});
  res.json(users);
}
async function show(req, res) {
  const users = await User.findByPk(req.params.id);
  if (users) {
    statuscode = 200;
    res.json(users);
  } else {
    statuscode = 404;
    res.send("Usuario no encontrado");
  }
}
async function store(req, res) {
  const { firstname, lastname, address, phone, email, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: {
      email: email,
    },
    defaults: {
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      password: password,
      // Número de apartamento, ciudad, departamento (Mdeo, etc)
    },
  });
  if (created) {
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
  } else {
    res.statuscode = 404;
    res.send("Error - User not created. Please check data");
  }
}

async function update(req, res) {
  try {
    await User.update(req.body, { where: { id: req.user.id } });
    res.statuscode = 200;
    res.send("User updated");
  } catch (err) {
    res.statuscode = 404;
    res.send("Error 404 - User not updated. Please check data");
  }
}

async function destroy(req, res) {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    res.statuscode = 200;
    res.send("Usuario eliminado");
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
};
