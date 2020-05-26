const express = require('express');
const app = express();

const productRoutes = require('./bin/routes/products');
const orderRoutes = require('./bin/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;