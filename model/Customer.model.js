const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registerationDate: {
    type: Date,
    default: Date.now
  },
  orders: [],
  telno : {
      type: String
  },
  address: [
      {
          buildingNo : {
              type: String
          },
          StreetNo : {
              type: String
          },
          postCode : {
              type: String
          }
      }
  ],
  card : {

        cardNo : {
            type: String
        },
        cardExpiryDate : {
            type : String
        },
        cardName : {
            type : String
        }
  },

  productsInterest : [
      {
          productName : {
                type: String,
          },
          UUID : {
              type: String
          }
      }
  ]



});

module.exports = mongoose.model('customer', CustomerSchema);