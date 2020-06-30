const mongoose = require('mongoose');



const ProductSchema =  new mongoose.Schema({
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    seller: {
      type: String
    },
    freeDelivery: {
        type: Boolean,
        required:true
      },
   
  });

  const Product = mongoose.model('Product', ProductSchema);

  module.exports = Product;