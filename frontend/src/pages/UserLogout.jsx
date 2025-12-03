import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

const token=localStorage.getItem('token');
const navigate=useNavigate()
axios.post(`${import.meta.env.VITE_API_URL}/users/logout`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
}).then((response)=>{
   if(response.status ===200){
    localStorage.removeItem('token');
    navigate('/UserLogin')
   }
})

  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
