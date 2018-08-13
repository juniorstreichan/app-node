"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const router = express.Router();

//#region CARREGAMENTO DAS ROTAS
const indexRoute = require("./routes/index.route");
const productRoute = require("./routes/product.route");
//#endregion

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/products", productRoute);
app.use("/", indexRoute);

module.exports = app;
