const express = require('express');
const app = express();


//Middleware 
const morgan = require('morgan');

//importing routes
const productRoutes = require('./bin/routes/products');
const orderRoutes = require('./bin/routes/orders');


//using middleware
app.use(morgan('dev'));

// using routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//error ahndling

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports = app;