import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import landingimage from '../../assests/Landing.jpeg';
export default function Landing() {
  return (
    <div className="container">
      <h1 className="logo">EASY<span className="exit">EXIT</span></h1>
      <div className="parent">
         <div className="left">
      <div className="text">Experience campus convenience in style with EasyExit-where swift issue, approval, and gatepass verification meet effortlessly!</div>
      <div className="btns">
        <Link to='/login' className="login">LOGIN</Link>
        <Link to='/register' className="signup">SIGN UP</Link>
      </div>
      </div> 
      <div className="right">
      <img className="landingimage" src={landingimage} alt="Landing" />
      </div>
      </div>
    </div>
  );
};