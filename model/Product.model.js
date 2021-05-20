const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ProductSchema = new Schema({

    Name : {
        type : String,
        required: true
    },
    Category : {
        type: String
    },
    Brand : {
        type: String
    },
    Size : {
        type: String
    },
    ProductID : {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    price : {
        type: Number
    },
    Tags : []
    ,
    Description: {
        type : String
    },
    Specification : {
        type: String
    },
    stockLevel : {
        type: Number
    },
    likes : [
        {
        customerEmail : {
            type: String
        }
    }
    ],
    weight: {
        type: String
    },
    customerReviews: [
        {
            customerName : {
                type: String, 
                required: true
            },
            customerEmail : {
                type: String,
                required: true
            },
            customerRating : {
                type: Number,
                required: true
            },
            customerComments : {
                type: String, 
                required: true
            }

        }
    ],
    productImages : [],


})


module.exports = mongoose.model('products', ProductSchema);