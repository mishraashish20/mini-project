import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-cover bg-center bg-no-repeat h-screen w-full flex justify-between flex-col bg-[url("https://img.freepik.com/premium-photo/abstract-blur-hospital-medical-clinic-interior-background-generative-ai_874904-42483.jpg")]' >
     
     <img  
       className='w-34 ml-8 pt-10 pl-10 h-15'
       src="https://sulcdn.azureedge.net/biz-live/img/resq-10116813-5aef4fc8.jpeg" 
       alt="" 
     />

     <div className='bg-white py-5 px-4 pb-7'>
      <h2 className='text-3xl font-bold'>Get Started with ResQRide</h2>
      <Link to='/UserLogin' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>continue</Link>
     </div>
    </div>
  )
}

export default Start
