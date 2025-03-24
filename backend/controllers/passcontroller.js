import express from "express";
import Passmodel from "../models/passes.js";


const requestpass=async (req,res)=>{


    try {
        const { userId,name, email, enrollmentNumber, proceedingTo,currentSemester, transport, purpose, time, date, atOwnResponsibility } = req.body;
        // Create a new pass request
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-GB");
        const passes=await Passmodel.find({userId:req.body.userId,date:date,status:{$in:['Accepted','Pending']}});
        console.log("passes",passes);
        if(passes.length>0){
          return res.json({success:false,message:"Pass already exists for date"});
        }

        const newPass = new Passmodel({
            userId,
            name,
            enrollmentNumber,
            proceedingTo,
            currentSemester,
            transport,
            purpose,
            time,
            date,
            atOwnResponsibility,
            status: "Pending", 
        });

        // Save to the database
        await newPass.save();

        res.status(201).json({ success:true,message: "Pass request submitted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error submitting pass request", error: error.message });
    }
}

const pastpasses=async (req,res)=>{

        try {
            const passes = await Passmodel.find({userId:req.body.userId}).sort({createdAt:-1});
            res.json({success:true,data:passes});
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
    

}

const status=async (req,res)=>{


    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Move to next day
    
        const day = String(tomorrow.getDate()).padStart(2, '0'); // Ensure 2-digit format
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = tomorrow.getFullYear();
    
        return `${day}/${month}/${year}`;
    };

try{
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    const tom=getTomorrowDate();
    const passes=await Passmodel.find({userId:req.body.userId,date:{ $in: [formattedDate,tom] }});
    console.log("passes",passes);
    res.json({success:true,data:passes});
}
catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
}

}
export {requestpass,pastpasses,status};