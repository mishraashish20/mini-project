import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password , setPassword]= useState('')
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [UserData, setUserData] = useState({})

  const navigate=useNavigate();

  const {user,setUser}=React.useContext(UserDataContext);

  const submitHandler= async(e)=>{
    e.preventDefault();
   const newUser=({
    fullname:{
      firstname:firstName,
    lastname:lastName
    },
    email:email,
    password:password

   })
const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
  
if(response.status===201){
    const data=response.data;
    setUser(data.user);
    localStorage.setItem('token',data.token);
    navigate('/Home');
}
    setEmail('')
      setFirstName('')
      setLastName('')
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
         <h3 className='text-lg mb-5 font-medium'>Enter your Name</h3>
       <div className='flex gap-4'>
          <input 
          required
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base'
           type="text" 
           placeholder='firstname'
           value={firstName}

           onChange={(e)=>{
            setFirstName(e.target.value)
           }}
          />
            <input 
          required
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
           type="text" 
           placeholder='lastname'
            value={lastName}

           onChange={(e)=>{
            setLastName(e.target.value)
           }}
          />
       </div>

           <h3 className='text-lg pt -5 mb-3 mt-5 font-medium'>Enter your email</h3>
 
           <input
             required
            
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="email" 
             placeholder='email@example.com'
              value={email}

           onChange={(e)=>{
            setEmail(e.target.value)
           }}
           />
 
           <h3 className='text-lg mb-2 font-medium'>Enter password</h3>
 
           <input 
             required 
           
             className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="password" 
             placeholder='password'
               value={password}

           onChange={(e)=>{
            setPassword(e.target.value)
           }}
           />
 
           <button className='bg-[#111] mb-7 font-semibold text-white rounded px-4 py-2 border w-full text-lg'>
             Signup
           </button>
 
           <Link to ='/UserLogin'className='text-blue-600 text-xl'>Login here</Link>
         </form>
       </div>
 
       <div className='text-[10px] keading-tight'>
        <p>By proceegind ,you consent to get calls ,whatsapp or SMS messages, including by automated means ,from ResQ and its affiliates to the number provided</p>
       </div>
 
     </div>
  )
}

export default UserSignup
