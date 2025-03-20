import React from 'react';
import './Login.css';
import { useState } from 'react';
import {useAuth} from '../../Auth/authcontext.jsx';
import axios from 'axios';
import { Navigate,useNavigate,Link } from 'react-router-dom';
export default function Login() {
  const navigate=useNavigate();
  const {userType,settoken,setuserType}=useAuth();
  const [logindata,setlogindata]=useState({
    email:"",
    password:"",
  });
  function handlelogin(e){
    setlogindata({...logindata,[e.target.name]:e.target.value});
  }
  const logincheck=async(e)=>{
    e.preventDefault();
    try{
    const response= await axios.post('http://localhost:8000/user/login',logindata);
    if (response.data.success){
      settoken(response.data.token);
      setuserType(response.data.userType);
    navigate(`/${response.data.userType}/dashboard`);
    }
    else{
      alert(response.data.message);
    }

  }
    catch(error){
      console.log(error);
       alert("Cannot Login");
     }
  }
  return (
    <div className="container">
      <h1 className="logo">EASY<span className="exit">EXIT</span></h1>
      <div className="parentlogin">
        <h1 className="loginhead">LOGIN</h1>
        <form action="post">
          <label htmlFor="email">Email-id:</label>
          <input type="text" name="email" onChange={handlelogin}/>
          <label htmlFor="password">Password:</label>
          <div className='eye'>
          <input type="password" onChange={handlelogin} className="passwordlogin" name="password"/>
           
      </div>
        <button className="loginpage" onClick={logincheck}>LOGIN</button>
        <div className="alreadysigned">Don't Have an Account?<Link className='link' to='/register'>Signup</Link></div>
        </form>
      </div>
    </div>
  )
}