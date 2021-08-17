require("dotenv").config();

const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.APP_PORT;
const routes = require("./routes/index");
const dbCreate = require("./seeders/index")();

const dbConnection = require("./dbConnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

dbConnection();

routes(app);

app.listen(port, console.log(`Servidor en puerto ${port}`));
