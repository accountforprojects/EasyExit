import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user:"helloouii5@gmail.com",
      pass: "juyw dzyl gkph nqon",
  },
});

// Function to generate JWT token
const createToken = (userId,userType) => {
  return jwt.sign({ userId,userType }, "9959425223", { expiresIn: "48h" });
};

const loginUser = async (req,res) => {
  const {email,password} = req.body;
  try {
      const user = await userModel.findOne({email})

      if (!user){
          return res.json({success:false,message:"User doesn't exist."})
      }

      const isMatch = await bcryptjs.compare(password,user.password);

      if (!isMatch) {
          return res.json({success:false,message:"Invalid credentials"})
      }
      const token = createToken(user._id,user.userType);
      if(user.userType=="admin"){
        return res.json({success:true,token,userType:"admin"});
      }
      else{
       return res.json({success:true,token,userType:"student"});
      }

  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

// **Send OTP Email API**
const sendotp=async (req,res)=>{
  const { email, otp } = req.body;



  if (!email || !otp || !validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email and OTP" });
  }
  const exists = await userModel.findOne({ email });
  if (exists) return res.json({ success: false, message: "User already exists." });

  const mailOptions = {
      from: "helloouii5@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.log("error:",error);
      res.json({ success: false,error});
  }
};

// **Register User API**
const registerUser=async (req,res) => {
  const { name, email, password } = req.body;

  try {
     

      if (password.length < 8) return res.json({ success: false, message: "Weak password" });

      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Save user
      const newUser = new userModel({ name, email, password: hashedPassword });
      const user = await newUser.save();

      // Generate token
      const token = createToken(user._id,user.userType);
      if(user.userType=="admin"){
        return res.json({success:true,token,userType:"admin"});
      }
      else{
       return res.json({success:true,token,userType:"student"});
      }

  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
  }
};
const profilefetch=async (req,res)=>{
    try{
    const user= await userModel.findOne({_id:new mongoose.Types.ObjectId(req.body.userId)});
    // console.log(user);
    res.status(200).json({name:user.name,email:user.email});
    }
    catch(error){
      console.log('profilefetch :',error);
      res.json({message:"Error",success:false});
    }
}
export { registerUser, loginUser, sendotp,profilefetch };
