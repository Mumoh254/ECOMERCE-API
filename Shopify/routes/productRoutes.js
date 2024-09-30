

const express = require('express');
const    router  =  express.Router();
//express  object
router.post("/api/v1/products"  , createProduct)
router.get("/api/v1/products" ,   getProducts)




module.exports   =   router;