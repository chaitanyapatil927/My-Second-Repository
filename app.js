const express = require('express');
const app = express();
const mongoose = require('mongoose');



//importing Middleware 
const morgan = require('morgan');
const bodyparser = require('body-parser');

//importing routes
const productRoutes = require('./bin/routes/products');
const orderRoutes = require('./bin/routes/orders');

//mongo
mongoose.connect(
    'mongodb+srv://chaitanyapatil927:' + process.env.MONGO_ATLAS_PW + '@node-rest-codeblog-9hddi.mongodb.net/test?retryWrites=true&w=majority',
    {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise;


//using middleware
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//cors errror remove
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  


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