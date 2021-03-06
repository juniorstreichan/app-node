'use strict';
// DEPENDÊNCAS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config');
const app = express();

// const router = express.Router();

// CONEXÃO COM O MongoDB
mongoose.connect(config.connectionString);

// CARREGAMENTO DOS MODELS
const Product = require('./models/product').default;
const Customer = require('./models/customer').default;
const Order = require('./models/order').default;
 

//  CARREGAMENTO DAS ROTAS
const indexRoute = require('./routes/index.route');
const productRoute = require('./routes/product.route');
const customerRoute = require('./routes/customer.route');
const orderRoute = require('./routes/order.route');
 
// UTILITÁRIOS / MIDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DEFINÇÃO DAS ROTAS
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);
app.use('/', indexRoute);

module.exports = app;
