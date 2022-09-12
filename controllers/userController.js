
const bcrypt = require("bcrypt")
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
//const sendmail = require("../sendmail");


module.exports.addUser = async (req, res) => {
  try { 
    
    const schema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      city: Joi.string().required(),
      companyName: Joi.string().required(),
      companyRegNo: Joi.string().required(), 
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const {firstName, lastName, email, companyName, companyRegNo, city, password} = req.body;

    //check if email exist 
    const checkEmail = await userModel.findOne({email});

    if(checkEmail) {
      return res.status(400).json({message: "Email already exist, try another email or login"})
    }
    
    //hash password
    const userPassword = await bcrypt.hash(password, 10);
    //const userPassword = JSON.stringify(hashedPassword);
    
    
    let newUser = {
      firstName,
      lastName,
      city,
      companyName,
      companyRegNo,
      email,
      userPassword
      
    }
    
    //add user 
    const user = new userModel(newUser);
    await user.save();
    
    delete newUser.userPassword;
    delete newUser.email;
    
   /* let receiver = email;
    const subject =  "USER ACCOUNT CREATION";
    const message = `An account has been created for you with the following login details: email: ${email}, password: ${password}. Login to update your details`;
    
    
    
    await sendMail(receiver, subject, message);
    */
    return res.status(201).json({"message": "User added successfully", newUser});
    
  } catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

//-------------------------------------------------
//-------------------------------------------------

module.exports.signin = async (req, res,) => {
  try {
    const {email, password} = req.body;
    
    //check if user exist im database
    let user = await userModel.findOne({email});
    if(!user) return res.send("No account found")
    
    //if user exist, check if password is correct
    const validPassword = await bcrypt.compare(password, user.userPassword);
    if(!validPassword) return res.send("invalid password")
    //if password is valid, generate a token
    const id = user._id;
    const token =  jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '2h'  
    });
    
    const firstName = user.firstName;
    const lastName = user.lastName;
    const welcomeMessage = `Welcome ${firstName}.${lastName}@${user.companyName}`;
      
      return res.status(201).json({welcomeMessage, message: "You are logged in", token});
    } catch (error) {
      return res.status(500).json(error);
    }
}