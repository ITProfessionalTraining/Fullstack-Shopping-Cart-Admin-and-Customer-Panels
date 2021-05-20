const express = require('express')
const Router = express.Router();
const PRODUCTMODEL = require('../../model/Product.model')

// @Get All Products
// @Get ALl Products Serveices
Router.get('/api/v1', async (req, res)=>{
    await PRODUCTMODEL.find({}, (err, products)=>{
        if(err) throw err;
        res.json(products);
    })
})

//@Get ALl hotproducts
Router.get('/api/hot', async(req, res)=>{

    let allProducts = await PRODUCTMODEL.find({});
    var sortedArray = [];
    allProducts.forEach(function(x){
        var obj = {aProducts: x , times : x.likes.length};
       sortedArray.push(obj);
    })
    var maxRating = sortedArray.sort((a,b)=> b.times - a.times);
    maxRating = maxRating.slice(0, 10);
    res.json({hotProducts: maxRating})

})


//@Get ALl cheapestProduct
Router.get('/api/cheapest', async(req, res)=>{

    let allProducts = await PRODUCTMODEL.find({});
    var sortedArray = [];
    allProducts.forEach(function(x){
        var obj = {aProducts: x , times : x.price};
       sortedArray.push(obj);
    })
    var maxRating = sortedArray.sort((a,b)=> b.times - a.times);
    maxRating = maxRating.slice(0, 10);
    res.json({cheapestProducts: maxRating})
})


//@Get ALl trendingproducts
Router.get('/api/trending', async(req, res)=>{
    let allProducts = await PRODUCTMODEL.find({});
    var sortedArray = [];
    allProducts.forEach(function(x){
        var obj = {aProducts: x , times : x.customerReviews.length};
       sortedArray.push(obj);
    })
    var maxRating = sortedArray.sort((a,b)=> b.times - a.times);
    maxRating = maxRating.slice(0, 10);
    res.json({trendingProducts: maxRating})
})


// @Get All Products
// @Get ALl Products Services
Router.post('/product/add', (req, res)=>{
    var {
        name,
        category, 
        brand, 
        size,
        productId, 
        color, 
        price,
        tags, 
        description, 
        specification,
        stocklevel,
        weight,
        url1,
        url2,
        url3,
        url4
    } = req.body;

    tags = tags.split(' ');
    price = Number(price);
    const aProducts = new PRODUCTMODEL({
        Name : name,
        Category : category,
        Brand : brand,
        Size :size,
        ProductID : productId,
        price: price,
        color: color,
        Tags : tags,
        Description: description,
        Specification : specification,
        stockLevel :stocklevel,
        weight: weight,
        productImages : [url1, url2, url3,url4],
    })
    aProducts.save();
    res.json({msg: 'product has been added successfully'});
})

// @Delete a Product
// @Delete a Product
Router.patch('/product/delete', async(req, res)=>{
    var {ProductID} = req.body;

    if(ProductID == ""){
        res.json({msg: 'Invalid Product ID'})
    }
    else{
        await PRODUCTMODEL.findByIdAndDelete({_id : ProductID}, (err, response)=>{
            if(err){
                res.json({msg: 'Error occured while deleting a product'})
            }else{
                res.json({msg: 'product has been deleted successfully'});
            }
   
        })
    }   
})

// @Update a Product
// @Update a set of product using ID
Router.put('/product/update', async (req, res)=>{
    var {
        name,
        UUID,
        category, 
        brand, 
        size,
        productId, 
        color, 
        price,
        tags, 
        description, 
        specification,
        stocklevel,
        weight,
        url1,
        url2,
        url3,
        url4
    } = req.body;
    price = Number(price)
    tags = tags.split(' ');
    const aProducts = {
        Name : name,
        Category : category,
        Brand : brand,
        Size :size,
        price: price,
        ProductID : productId,
        color: color,
        Tags : tags,
        Description: description,
        Specification : specification,
        stockLevel :stocklevel,
        weight: weight,
        productImages : [url1, url2, url3,url4],
    }

    await PRODUCTMODEL.findByIdAndUpdate({_id: UUID}, aProducts, (err, response)=>{
        if(err){
            res.json({msg: 'Error Encountered while updating Product'})
        }
        else{
            res.json({msg: `Product has been successfully updated`})
        }
    })

})


//@ Adding reviews to the product
//@ Post Reviews
Router.post('/product/reviews/add', async(req, res)=>{
    var {UUID, customerName, customerEmail, customerRating, customerComments } = req.body;
    if(UUID == "" || customerName == "" || customerEmail == "" || customerComments == ""){
    res.json({msg: 'one or more fields are missing'})
    }else{
    customerRating = Number(customerRating);
    var aRating = {customerName, customerEmail, customerRating, customerComments};
    var certainProduct = await PRODUCTMODEL.findById({_id: UUID});

    if (certainProduct.customerReviews.filter(e => e.customerEmail === customerEmail).length > 0) {
       res.json({msg: 'a review already exist'})
      }
    else{
        certainProduct.customerReviews.unshift(aRating);
        certainProduct.save();
        res.json({msg: 'a review has been added'});
    } 
   }
})

//@ Removing reviews to the product
//@ Put delete Reviews
Router.put('/product/reviews/delete', async(req, res)=>{
    var {UUID, email} = req.body;
    if(UUID !== "" || email !== ""){
        var findProduct = await PRODUCTMODEL.findById({_id: UUID});
        var filteredReviews = findProduct.customerReviews.filter((aReview)=>{return aReview.customerEmail !== email});
        findProduct.customerReviews = filteredReviews;
        findProduct.save();        
       res.json({msg: 'a review has been deleted'});
    }
    else{
        res.json({msg: 'Error occured while deleting reviews'})
    }
})


//@ Editing a reviews to the product
//@ Put Reviews
Router.put('/product/reviews/update', async(req, res)=>{
    var {UUID, customerName, customerEmail, customerRating, customerComments } = req.body;
    if(UUID == "" || customerName == "" || customerRating == "" || customerEmail == "" || customerComments == ""){
        res.json({msg: 'one or more information is missing'})
    }else{
        var findProduct = await PRODUCTMODEL.findById({_id: UUID});
        var positionIndex = findProduct.customerReviews.findIndex(x=> x.customerEmail === customerEmail);
        customerRating = Number(customerRating);
        var updatedReview = {customerName, customerEmail, customerRating, customerComments};
        findProduct.customerReviews[positionIndex] = updatedReview;
        findProduct.save();
        res.json({msg: 'review has been updated successfully'});
    }
});


//@ Add a like
//@ Put add a like 
Router.post('/product/like', async (req, res)=>{
    var {UUID, customerEmail} = req.body;
    if(UUID == "" || customerEmail == ""){
        res.json({msg: 'one or more things are missing'})
    }
    else{
        var findProduct = await PRODUCTMODEL.findById({_id: UUID});
        var customerDetails = {customerEmail : customerEmail}
        findProduct.likes.unshift(customerDetails);
        findProduct.save();      
        res.json({msg:'liked successfully'})
    }
})

//@ delete a like
//@ unlike 
Router.put('/product/unlike', async(req, res)=>{
    var {UUID, customerEmail} = req.body;
    if(UUID == "" || customerEmail == ""){
        res.json({msg: 'one or more things are missing'})
    }
    else{
        var findProduct = await PRODUCTMODEL.findById({_id: UUID});
        var RemoveLikes = findProduct.likes.filter((alike)=>{alike.customerEmail !== customerEmail});
        findProduct.likes = RemoveLikes;
        findProduct.save();
        res.json({msg: 'unliked successfully'})
    }
})

module.exports = Router;