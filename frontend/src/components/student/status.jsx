import React, { useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from '../../Auth/authcontext.jsx'
import "./status.css";

export default function Status() {
  const {token}=useAuth();
  const [passes, setPasses] = useState([]);

  

  useEffect(() => {
    if (token) {
      fetchStatusPasses();
    }
  }, [token]);

  const fetchStatusPasses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/passes/status", {
        headers: { token },
      });
      setPasses(response.data.data);
    } catch (error) {
      console.error("Error fetching status passes:", error);
    }
  };

  return (
    <div className="status-container">
      {passes.length > 0 ? (
        passes.map((pass) => (
          <div className="status-card" key={pass.id}>
           <div className="status-body">
              <p><strong>Name:</strong> {pass.name}</p>
              <p className="status-right"><strong>Current Semester: </strong>{pass.currentSemester}</p>
              <p><strong>Enrollment No:</strong> {pass.enrollmentNumber}</p>
              <p className="status-right"><strong>Date:</strong> {pass.date}</p>
              <p><strong>Proceeding to:</strong> {pass.proceedingTo}</p>
              <p className="status-right"><strong>Purpose:</strong> {pass.purpose}</p>
              <p><strong>Transport:</strong> {pass.transport}</p>
              <p className="status-right"><strong>Out time:</strong> {pass.time}</p>
              <p><strong>At own responsibility:</strong> {pass.atOwnResponsibility}</p>
            </div>

            <div className="status-footer">
              <span className={`status-btn ${pass.status.toLowerCase()}`}>
                {pass.status}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No active passes</p>
      )}
    </div>
  );
}