const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        default: "https://example.com/shoe.jpeg" 
    }
}, { timestamps: true });

const productModel = mongoose.model('products', productSchema); 
module.exports = productModel;
