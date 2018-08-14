"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const router = express.Router();

mongoose.connect('mongodb://.mlab.com:19442/produtos?authSource=produtos&w=1')
//#region CARREGAMENTO DOS MODELS
const Product = require('./models/product');
 //#endregion


//#region CARREGAMENTO DAS ROTAS
const indexRoute = require("./routes/index.route");
const productRoute = require("./routes/product.route");
//#endregion

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/products", productRoute);
app.use("/", indexRoute);

module.exports = app;