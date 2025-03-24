import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/authcontext.jsx";
import axios from "axios";
import "./Reject.css";

export default function RejectedPasses() {
    const { token } = useAuth();
    const [rejectedPasses, setRejectedPasses] = useState([
        { name: "Karthik", proceedingTo: "Civil Lines", date: "23-02-2025", time: "8:50pm", status: "Accepted",reason:"Too late for to start for civillines" },
        { name: "Meghana", proceedingTo: "Civil Lines", date: "25-02-2025", time: "8:50pm", status: "Accepted",reason:"Too late for to start for civillines" }
    ]);

    useEffect(() => {
        if (token) {
            fetchRejectedPasses();
        }
    }, [token]);

    const fetchRejectedPasses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/rejected", {
                headers: { token },
            });
            setRejectedPasses(response.data.data);
            console.log(rejectedPasses);
        } catch (error) {
            console.error("Error fetching accepted passes:", error);
        }
    };

    return (
        <div className="pass-container">
            <div className="table">
                {rejectedPasses.length > 0 ? (
                    rejectedPasses.map((pass, index) => (
                        <div className="maintrow">
                        <div key={index} className="table-row">
                            <p>{pass.name}</p>
                            <p>{pass.proceedingTo}</p>
                            <p>{pass.date}</p>
                            <p>{pass.time}</p>
                            <p className="status">❌ Rejected</p>
                        </div>
                        <p className="rejectreason">Reason: {pass.RejectedReason}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-passes">No accepted passes found.</p>
                )}
            </div>
        </div>
    );
}
