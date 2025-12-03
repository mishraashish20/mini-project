import React, { useState ,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserLogin = () => {
const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const [UserData,setUserData]=useState({})

  const {user,setUser}=useContext(UserDataContext);
  const navigate=useNavigate();


const submitHandler=async(e)=>{
  e.preventDefault();
  const userData=({
    email:email,
    password:password
  })
 
const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

if(response.status===200){

    const data=response.data;
    setUser(data.user);
    localStorage.setItem('token',data.token);
    navigate('/Home');
}
  setEmail('')
  setPassword('')
}

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
     
      <div> 
        <img  
          className='w-34 pt-10 mb-10 h-15'
          src="https://sulcdn.azureedge.net/biz-live/img/resq-10116813-5aef4fc8.jpeg" 
          alt="" 
        />

        <form  onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-lg mb-2 font-medium'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email" 
            placeholder='email@example.com'
          />

          <h3 className='text-lg mb-2 font-medium'>Enter password</h3>

          <input 
            required 
             value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password" 
            placeholder='password'
          />

          <button className='bg-[#111] mb-7 font-semibold text-white rounded px-4 py-2 border w-full text-lg'>
            Login
          </button>

          <Link to ='/UserSignup'className='text-blue-600 text-xl'>Create new Account</Link>
        </form>
      </div>

      <div>
        <Link  to ='/CaptainLogin'className='bg-[#597] flex items-center justify-center mb-7 font-semibold text-white rounded px-4 py-2 border w-full text-lg'>
          Sign in as Captain
        </Link>
      </div>

    </div>
  )
}

export default UserLogin
