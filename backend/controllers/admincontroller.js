import express from "express";
import Passmodel from "../models/passes.js";

const PendingPasses= async (req,res)=>{
    try{
    const passes=await Passmodel.find({status:"Pending"});
    res.json({success:true,data:passes});

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Server Error"});
    }
}
const AcceptedPasses=async (req,res)=>{
    try{
        const passes=await Passmodel.find({status:"Accepted"});
        res.json({success:true,data:passes});
    
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:"Server Error"});
        }

}
const RejectedPasses=async (req,res)=>{

    try{
        const passes=await Passmodel.find({status:"Rejected"});
        res.json({success:true,data:passes});
    
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:"Server Error"});
        }

}

const ChangeStatus=async (req,res)=>{

    try{
        const {passId,status,reason}=req.body;

         const update={status};
         if(status=="Rejected" && reason){
        update.RejectedReason=reason;
        }
        console.log("Request",req.body);
        console.log("update",update);
        const updatedPass = await Passmodel.findByIdAndUpdate(
            passId,
            update,
            { new: true }
        );
        console.log("updated",updatedPass);
        console.log("message",`Pass status updated to ${status}`);
        res.status(200).json({ success: true, message: `Pass status updated to ${status}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


export {PendingPasses,AcceptedPasses,RejectedPasses,ChangeStatus};



