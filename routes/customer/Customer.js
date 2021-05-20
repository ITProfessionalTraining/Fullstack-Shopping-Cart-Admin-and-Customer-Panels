const express = require('express')
const Router = express.Router();
const PRODUCTMODEL = require('../../model/Product.model')
const CUSTOMERMODEL = require('../../model/Customer.model')





Router.get('/customer', async(req, res)=>{
    let data = await CUSTOMERMODEL.find({});
    res.json({data})
})




module.exports = Router;