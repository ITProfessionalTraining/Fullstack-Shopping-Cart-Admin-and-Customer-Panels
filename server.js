const express = require('express')
const app = express();
const config = require('config');
const cors = require('cors');
const ConnectDB = require('./config/db')


//@ Connecting to the Database
ConnectDB();


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.use('/products', require('./routes/products/Product'))
app.use('/admin/api', require('./routes/admin/admin'))
app.use('/customers/api', require('./routes/customer/Customer'))


module.exports = app;



// 

