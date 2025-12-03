import React ,{useState}from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

  const navigate=useNavigate();

   const [email, setEmail] = useState('')
    const [password , setPassword]= useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
     const [ vehicleType, setVehicleType ] = useState('')
   


    const {captain,setCaptain}=React.useContext(CaptainDataContext);
  
      

    const submitHandler=async(e)=>{
      e.preventDefault();
     const CaptainData=({
      fullname:{
        firstname:firstName,
      lastname:lastName
      },
      email:email,
      password:password,
       vehicle:{
          vehicleType: vehicleType
       }
     })
     const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData)
  if (response.status === 201) {
    const data = response.data;
    setCaptain(data.captain);
    localStorage.setItem('token', data.token);
    navigate('/CaptainHome');
}

      setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
         setVehicleType('')
      
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

           <h3 className='text-lg mt-5 mb-5 font-medium'>Enter your email</h3>
 
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
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>

             <div className=' w-full flex gap-4 mb-7'>
           
            <select
              required
              className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="mini">mini</option>
              <option value="large">large</option>
             
            </select>
          </div>
 
           <button className='bg-[#111] mb-7 font-semibold text-white rounded px-4 py-2 border w-full text-lg'>
             Signup
           </button>
 
          
         </form>

          <Link to ='/CaptainLogin'className='text-blue-600 text-xl'>Login here</Link>
       </div>
 
       <div className='text-[10px] leading-tight'>
        <p>This site is protected by reCAPTCHA and the <span className='underline'> Google Privacy Policy</span> and <span>Terms of Service apply</span>.</p>
       </div>
 
     </div>
  )
}

export default CaptainSignup
