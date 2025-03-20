import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth } from "../../Auth/authcontext.jsx";
import Landing from "../../assests/Landing.jpeg";
import AcceptedPasses from './Accept.jsx';
import RejectPasses from './Reject.jsx';
import axios from "axios";

const Home = () => {
    const [activeTab, setActiveTab] = useState("pending");
     const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { token,logout,userType } = useAuth();
    const [pendingpasses, setPendingPasses] = useState([{
        _id: 1,
        name: "Riya Sharma",
        enrollmentNumber: "IEC2022021",
        currentSemester: "5",
        proceedingTo: "Civil Lines",
        date: "12-Aug-2023",
        time: "5:00 p.m.",
        transport: "Auto",
        atOwnResponsibility: "Yes",
        purpose: "Shopping",
        pending: "Pending",
    },]);
    const [rejectingPass, setRejectingPass] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        if (token) {
            fetchpendingPasses();
        }
    }, [token]);


    const fetchpendingPasses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/pending", {
                headers: { token },
            });
            setPendingPasses(response.data.data);
        } catch (error) {
            console.error("Error fetching status passes:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user/profile", {
                headers: { token },
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleAccept = async (passId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/admin/status`,
                { passId, status: "Accepted" },
                { headers: { token } }
            );

            if (response.status === 200) {
                setPendingPasses((prevPasses) => prevPasses.filter((pass) => pass._id !== passId));
                console.log(`Pass ${passId} accepted`);
            }
        } catch (error) {
            console.error("Error accepting pass:", error);
        }
    };

    const handleRejectClick = (passId) => {
        setRejectingPass(passId);
    };

    const handleRejectSubmit = async () => {
        if (!rejectReason.trim()) {
            alert("Please provide a rejection reason.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/admin/status`,
                { passId: rejectingPass, status: "Rejected", reason: rejectReason },
                { headers: { token } }
            );

            if (response.status === 200) {
                setPendingPasses((prevPasses) => prevPasses.filter((pass) => pass._id !== rejectingPass));
                console.log(`Pass ${rejectingPass} rejected with reason: ${rejectReason}`);
                setRejectingPass(null);
                setRejectReason("");
            }
        } catch (error) {
            console.error("Error rejecting pass:", error);
        }
    };

    const [profile, setProfile] = useState({ name: "", email: "" });
     const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="admincontainer">
            {/* Navbar */}
            <nav className="navbar">
                <h1 className="logon">
                    EASY<span className="exitn">EXIT</span>
                </h1>
                <div className="nav-links">
                    <p className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
                        Pending Passes
                    </p>
                    <p className={activeTab === "accepted" ? "active" : ""} onClick={() => setActiveTab("accepted")}>
                        Accepted Passes
                    </p>
                    <p className={activeTab === "rejected" ? "active" : ""} onClick={() => setActiveTab("rejected")}>
                        Rejected Passes
                    </p>
                </div>
                <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>
                    👤
                </div>
            </nav>

             {/* Profile Popup */}
                        {showProfile && (
                             <div className="profile-popup right-align">
                             {isEditing ? (
                               <>
                               <div className="profile-header">
                                   <img src={Landing} alt="Profile" className="profile-image" />
                                   <span className="profile-name">{profile.name}</span>
                               </div>
                               <ul className="profile-menu">
                                   <li className="editingli">Name:{profile.name}</li>
                                   <li className="editingli">{profile.email}</li>
                                   <li className="editingli">Role:{userType}</li>
                                   <li className="logout" onClick={()=> setIsEditing(false)}>Back</li>
                               </ul>
                           </>
                             ) : (
                                 <>
                                     <div className="profile-header">
                                         <img src={Landing} alt="Profile" className="profile-image" />
                                         <span className="profile-name">{profile.name}</span>
                                     </div>
                                     <ul className="profile-menu">
                                         <li onClick={() => setIsEditing(true)}><i className="icon">⚙️</i> Edit Profile</li>
                                         <li><i className="icon">🔒</i> Settings & Privacy</li>
                                         <li><i className="icon">❓</i> Help & Support</li>
                                         <li className="logout" onClick={logout}><i className="icon">🚪</i> Logout</li>
                                     </ul>
                                 </>
                             )}
                         </div>
                        )}

            {/* Pass Container */}
            <div >
                {activeTab === "pending" && (
                    <div className="pending-container">
                        {pendingpasses.length > 0 ? (
                            pendingpasses.map((pass) => (
                                <div className="pending-card" key={pass._id}>
                                    <div className="pending-body">
                                        <p><strong>Name:</strong> {pass.name}</p>
                                        <p className="pending-right"><strong>Current Semester:</strong> {pass.currentSemester}</p>
                                        <p><strong>Enrollment No:</strong> {pass.enrollmentNumber}</p>
                                        <p className="pending-right"><strong>Date:</strong> {pass.date}</p>
                                        <p><strong>Proceeding to:</strong> {pass.proceedingTo}</p>
                                        <p className="pending-right"><strong>Purpose:</strong> {pass.purpose}</p>
                                        <p><strong>Transport:</strong> {pass.transport}</p>
                                        <p className="pending-right"><strong>Out time:</strong> {pass.time}</p>
                                        <p><strong>At own responsibility:</strong> {pass.atOwnResponsibility}</p>
                                    </div>

                                    <div className="pending-footer">
                                        <button className="pending-accept" onClick={() => handleAccept(pass._id)}>Accept</button>
                                        <button className="pending-reject" onClick={() => handleRejectClick(pass._id)}>Reject</button>
                                    </div>

                                    {/* Rejection reason input */}
                                    {rejectingPass === pass._id && (
                                        <div className="reject-reason-container">
                                            <textarea
                                                placeholder="Enter rejection reason"
                                                value={rejectReason}
                                                onChange={(e) => setRejectReason(e.target.value)}
                                            />
                                            <button className="pending-reject-submit" onClick={handleRejectSubmit}>
                                                Submit Rejection
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No active passes</p>
                        )}
                    </div>
                )}
                {activeTab === "accepted" && (<><AcceptedPasses/> </>)}
                {activeTab === "rejected" && (<><RejectPasses/></>)}
            </div>
        </div>
    );
};

export default Home;
