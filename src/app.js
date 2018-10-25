'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {APP_CONFIG} = require('../config');
const app = express();

const router = express.Router();

mongoose.connect(`mongodb://${APP_CONFIG.dbUser}:${APP_CONFIG.dbPassword}@ds119442.mlab.com:19442/produtos?authSource=produtos&w=1`);
//#region CARREGAMENTO DOS MODELS
const Product = require('./models/product').default;
const Customer = require('./models/customer').default;
const Order = require('./models/order').default;
//#endregion

//#region CARREGAMENTO DAS ROTAS
const indexRoute = require('./routes/index.route');
const productRoute = require('./routes/product.route');
const customerRoute = require('./routes/customer.route');
const orderRoute = require('./routes/order.route');
//#endregion

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
app.use('/', indexRoute);

module.exports = app;
