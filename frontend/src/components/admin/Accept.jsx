import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/authcontext.jsx";
import axios from "axios";
import "./Accept.css";

export default function AcceptedPasses() {
    const { token } = useAuth();
    const [acceptedPasses, setAcceptedPasses] = useState([
        { name: "Karthik", proceedingTo: "Civil Lines", date: "23-02-2025", time: "8:50pm", status: "Accepted" },
        { name: "Meghana", proceedingTo: "Civil Lines", date: "25-02-2025", time: "8:50pm", status: "Accepted" }
    ]);

    useEffect(() => {
        if (token) {
            fetchAcceptedPasses();
        }
    }, [token]);

    const fetchAcceptedPasses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/accepted", {
                headers: { token },
            });
            setAcceptedPasses(response.data.data);
            console.log(AcceptedPasses);
        } catch (error) {
            console.error("Error fetching accepted passes:", error);
        }
    };

    return (
        <div className="pass-container">
            <div className="table">
                {acceptedPasses.length > 0 ? (
                    acceptedPasses.map((pass, index) => (
                        <div key={index} className="table-row">
                            <p>{pass.name}</p>
                            <p>{pass.proceedingTo}</p>
                            <p>{pass.date}</p>
                            <p>{pass.time}</p>
                            <p className="status accepted">✔ Accepted</p>
                        </div>
                    ))
                ) : (
                    <p className="no-passes">No accepted passes found.</p>
                )}
            </div>
        </div>
    );
}
