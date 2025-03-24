import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Pending from "./Pending.jsx";
import Status from "./status.jsx";
import { useAuth } from "../../Auth/authcontext.jsx";
import Landing from "../../assests/Landing.jpeg";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const { token, userType,logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "request");

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const [formData, setFormData] = useState({
        name: "",
        enrollmentNumber: "",
        proceedingTo: "",
        currentSemester: "",
        transport: "",
        purpose: "",
        time: "",
        date: "",
        atOwnResponsibility: "Yes",
        status: "pending"
    });

    const [profile, setProfile] = useState({ name: "", email: "" });
    const [showProfile, setShowProfile] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/passes/request", formData, { headers: { token } });
            console.log(response.data);
            if (response.data.success === false) {
                toast.error("Already Exists for the Date");
            } else {
                toast.success("Submitted");
            }
        } catch (error) {
            toast.error("Error");
            console.log(error);
        }
    };

    return (
        <div className="studentcontainer">
            {/* Navbar */}
            <nav className="navbar">
                <h2 className="logon">EASY<span className="exitn">EXIT</span></h2>
                <div className="nav-links">
                    <p className={activeTab === "request" ? "active" : ""} onClick={() => setActiveTab("request")}>Request for Pass</p>
                    <p className={activeTab === "past" ? "active" : ""} onClick={() => setActiveTab("past")}>Past Passes</p>
                    <p className={activeTab === "status" ? "active" : ""} onClick={() => setActiveTab("status")}>Status</p>
                </div>
                <div className="profile-icon" onClick={() => setShowProfile(!showProfile)}>👤</div>
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

            {/* Content Section */}
            <div className="content">
                {activeTab === "request" && (
                    <div className="form-container">
                        <h3>Request for Pass</h3>
                        <ToastContainer />
                        <form onSubmit={handleSubmit}>
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                            <label>Enrollment number:</label>
                            <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} required />

                            <label>Proceeding to:</label>
                            <input type="text" name="proceedingTo" value={formData.proceedingTo} onChange={handleChange} required />

                            <div className="inline-fields">
                                <div>
                                    <label>Current Semester:</label>
                                    <input type="text" name="currentSemester" value={formData.currentSemester} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label>Transport:</label>
                                    <input type="text" name="transport" value={formData.transport} onChange={handleChange} />
                                </div>
                            </div>

                            <label>Purpose:</label>
                            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} required />

                            <div className="inline-fields">
                                <div>
                                    <label>Time:</label>
                                    <input type="text" name="time" value={formData.time} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label>Date:</label>
                                    <input type="text" name="date" value={formData.date} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="radio-group">
                                <label>At own responsibility:</label>
                                <button type="button" className={formData.atOwnResponsibility === "Yes" ? "selected" : ""} onClick={() => setFormData({ ...formData, atOwnResponsibility: "Yes" })}>Yes</button>
                                <button type="button" className={formData.atOwnResponsibility === "No" ? "selected" : ""} onClick={() => setFormData({ ...formData, atOwnResponsibility: "No" })}>No</button>
                            </div>

                            <button type="submit" className="submit-btn">SUBMIT</button>
                        </form>
                    </div>
                )}

                {activeTab === "past" && <Pending />}
                {activeTab === "status" && <Status />}
            </div>
        </div>
    );
};

export default Home;
