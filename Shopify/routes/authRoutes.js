const express = require('express');
const { register, login , getUsers , getUser, deleteUser, updatedUser} = require('../controller/userCtrl');

const   router  = express.Router();


router.post("/register"  ,  register)
router.post("/login"   , login)

router.get("/users" , getUsers)
router.get("/user/:id" , getUser)
router.delete("/user/:id" , deleteUser)
router.put("/users/update"   ,  updatedUser)


module.exports  =   router;
