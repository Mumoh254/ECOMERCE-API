
const express = require('express');
const mongoose = require('mongoose');
const productModel = require('../models/productModel');


const  createProduct = async  (  req  ,  res )=>{

    try {

    const   {   }  =   req.body;
    const   product  =  await    productModel.create(req.body);
    if( !product) {
        return  res.status(404).json({
            message:  "Error  creating  product" 
        })

    }  else {
        res.status(201).json({
            message: "Product  created   successfully"
        })
    }

        
    } catch (error) {
        
    }          





}

module.exports = {
    createProduct
}

