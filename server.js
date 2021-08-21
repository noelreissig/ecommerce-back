require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.APP_PORT;
const routes = require("./routes/index");
const dbInitialSetup = require("./dbInitialSetup");
// const passport = require("./config/passport");
// const sessions = require("./config/sessions");
// const dbConnection = require("./dbInitialSetup");
// const dbCreate = require("./seeders/index")();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// sessions(app);
// passport(app);

dbInitialSetup();
routes(app);

app.listen(port, console.log(`Servidor en puerto ${port}`));
