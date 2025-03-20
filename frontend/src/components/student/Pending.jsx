import React, { useState,useEffect } from 'react'
import axios from 'axios';
import "./Pending.css"

export default function Pending() {

   const [token,settoken]=useState("");
   const [data,setData]=useState([]);
    const fetchOrders = async () => {
        try{
            console.log("Fetching orders...");
            console.log("Token being sent:", token);
        const response = await axios.get("http://localhost:8000/passes/pending",{headers:{token}});
        setData(response.data.data);
        }
        catch(error){
         console.log(error);

    }
}

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    useEffect(()=>{
        async function loadData() {
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    
    return (
        <div className="pass-container"> 
          <div className="table">
            {data.map((pass, index) => (
              <div key={index} className="table-row">
                <p>{pass.proceedingTo}</p>
                <p>{pass.date}</p>
                <p>{pass.time}</p>
                <p className={`status ${pass.status.toLowerCase()}`}>
  {pass.status === "Accepted" ? "✔ Accepted" : pass.status === "Rejected" ? "❌ Rejected" : "⌛ Pending"}
</p>

              </div>
            ))}
          </div>
        </div>
      );
}