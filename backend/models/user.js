const mongoose=require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://karthik:9959425223@cluster0.1f9fn.mongodb.net/practice').then(()=>console.log("DataBase Connected"));
}
module.exports=connectDB;

// mongodb+srv://karthik:<db_password>@cluster0.1f9fn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//mongodb+srv://KarthikReddy:9959425223@cluster0.klqgw.mongodb.net/food-delretryWrites=true&w=majority&appName=Cluster0import mongoose from "mongoose";
