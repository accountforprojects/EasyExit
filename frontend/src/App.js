import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx"
import Home from "./components/student/Home.jsx";
import Landing from './components/Landing/Landing.jsx';
import Dashboard from './components/admin/Dashboard.jsx';
import {useAuth} from './Auth/authcontext.jsx';
 // Create Home component

const App = () => {
    const {userType}=useAuth();
    return (
        
        <Router>
            <Routes>

                <Route path="/student/dashboard" element={(userType==="student")?<Home/>:<Navigate replace to={`/`}/>} />
                <Route path="/admin/dashboard" element={(userType==="admin")?<Dashboard/>:<Navigate replace to={`/`} />} />
                <Route path="/" element={(userType)?<Navigate replace to={`/${userType}/dashboard`}/>:<Landing />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={userType ? <Navigate replace to={`/${userType}/dashboard`} /> : <Landing />} />

            </Routes>
        </Router>
    );
};

export default App;
