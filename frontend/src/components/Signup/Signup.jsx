import React from 'react';
import './Signup.css';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import {useAuth} from '../../Auth/authcontext.jsx';
export default function Signup() {
  const navigate=useNavigate();
  const [otp,setotp]=useState("");
  const [mis,setmis]=useState(0);
  const [message,setmessage]=useState("");
  const [otpSent,setOtpSent]=useState(false);
  const {settoken,setuserType}=useAuth();
  const [formdata,setformdata]= useState({
    name:"",
    email:"",
    password:""
  });
  const [userotp,setuserotp]=useState("");
  const handle=(e)=>{
    setformdata({...formdata, [e.target.name]:e.target.value});
  }
  const handleotp=(e)=>{
    setuserotp(e.target.value);
  }
  
function otpgeneration(){
  let otp="";
  for(let i=0;i<6;i++){
    let c=Math.floor(Math.random()*10);
    otp+=(c);
  }
  return otp;
}
const sendotp = async (e)=>{
  e.preventDefault();
  let potp=otpgeneration();
  setmis(0);
  setotp(potp);
  setmessage('Sending Otp...');
  try{
    const response= await axios.post('http://localhost:8000/user/send-otp',{otp:potp,email:formdata.email});
    setmessage(response.data.message);
    if(response.data.success==false) setOtpSent(false);
    else setOtpSent(true);
  }
  catch(error){
    console.log("error otp not sent :",error);
    setmessage('Error Sending Otp...');
  }
}
const signingup=async (e)=>{
  e.preventDefault();
    if(userotp==otp){
      try{
        const response = await axios.post('http://localhost:8000/user/register',formdata);
        if (response.data.success){
          settoken(response.data.token);
          setuserType(response.data.userType);
          // localStorage.setItem("token",response.data.token);
          // localStorage.setItem("userType",response.data.userType);
          navigate('/student/dashboard');
        }
        else{
          setmessage(response.data.message);
        }
       
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      setmis(1);
    }
}
  return (
    <div className="container">
      <h1 className="logo">EASY<span className='exit'>EXIT</span></h1>
      <div className={`parentsignup ${otpSent ? 'otp-sent' : ''}`}>
        <h1 className="signheading">Sign up</h1>
        <ToastContainer/>
        <form method="post">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={handle} className='email'  />


          {!otpSent ? (
            <>
            <button className="opgen" onClick={sendotp}>Send OTP</button>
            <div className="alreadyloged">Already Have an Account?<Link className='link' to='/login'>Login</Link></div>
            </>

          ) :(<>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" onChange={handle} />
            
            <label htmlFor="password">Password:</label>
            <input type="password" onChange={handle} name="password" />
            
            <label htmlFor="otp">OTP:</label>
            <input type="text" onChange={handleotp} name="otp" />
            <button className="signuppage" onClick={signingup}>SIGN UP</button></>)}
          
        </form>
        <p className="messagesignup">{message}</p>
        {(mis)?<p className='mis'>Please Enter Valid Otp</p>:""}
      </div>
    </div>
  )
}