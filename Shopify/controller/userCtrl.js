const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const { error } = require('jquery');

// Register endpoint
const register = async (req, res) => {
  try {
    const { password, email, name } = req.body;

    // Check if user already exists
    const registeredUser = await userModel.findOne({ email });
    if (registeredUser) {
      return res.status(400).json({
        message: 'User already exists. Please login.',
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      email,
      password: encryptedPassword,
      name,
    });

    // Save the new user to the database
    const registered = await newUser.save();
    if (!registered) {
      return res.status(500).json({
        message: 'User registration failed. Please try again.',
      });
    }

    // Successful registration
    return res.status(201).json({
      message: 'User registration successful',
      user: registered,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      message: 'An error occurred during registration. Please try again.',
    });
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist, please register.',
      });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid password.'
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Return the token and user info
    return res.status(200).json({
      message: 'Login successful',
      token, 
      user: {
        name: user.name,
        email: user.email,
      }, 
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({
      message: 'An error occurred during login. Please try again.',
    });
  }
};

// Get all users endpoint
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: 'No users found.',
      });
    }

    return res.status(200).json({
      message: 'Users fetched successfully',
      users,
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      message: 'An error occurred while fetching users.',
    });
  }
};

// Get a specific user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;  
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      message: 'An error occurred while fetching the user',
    });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete user by ID
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      message: 'An error occurred while deleting the user',
    });
  }
};


//update  user

const  updateUser  = async  ()=>{

  try {

  const  { id }   =  req.params
  const {password   ,  email  ,  name  }  =  req.body;
  //check if  user  already  exist  in  the   database 

  const  user  =  await userModel.findOne({email})
  if (  !user)  {
    res.status().json({
      message: "User    does   not   exist "
    })

  }  else  {
   //update   user

   user.email  =  email
   user.name  =  name 
   user.password  =  await  bcrypt.hash(password , 10)
   const   updatedUser = await  userModel.save(user)
   if(!updatedUser)  {
    res.status().json( {
      message:  "error   updating    user",
      error:  error
    })

   }   else {
    res.status(200).json({
      message: "User   updated Successfully",
      user: user
    })
   }
  }
    
  } catch (error) {
     console.log(error)
    
  }
}
module.exports = {
  register,
  login,
  getUsers,
  getUser,
  deleteUser,
  updatedUser
};
