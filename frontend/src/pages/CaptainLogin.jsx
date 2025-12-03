
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainLogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()
  

const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/CaptainHome')

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

          
        </form>

        <Link to ='/CaptainSignup'className='text-blue-600 text-xl'>Register as a Ambulace Driver</Link>

      </div>

      <div>
        <Link  to ='/UserLogin'className='bg-[#6DA] flex items-center justify-center mb-7 font-semibold text-white rounded px-4 py-2 border w-full text-lg'>
          Sign in as User
        </Link>
      </div>

    </div>
  )
}

export default CaptainLogin
