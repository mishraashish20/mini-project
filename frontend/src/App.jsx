import React,{useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

import Start from './pages/Start'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import Riding from './pages/Riding'

//  import CaptainContext from './context/CaptainContext.jsx';
import CaptainRiding from './pages/CaptainRiding'

// import  CaptainDataContext  from './context/CaptainContext';

import CaptainProtectWrapper from './pages/CaptainProtectWrapper';

 import CaptainLogout from './pages/CaptainLogout'

import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div >
      <Routes>
        
       <Route path='/' element={<Start/>}/>
       <Route path='riding' element={<Riding/>}/>
       <Route path='/CaptainSignup' element={<CaptainSignup/>}/>
        <Route path='/CaptainLogin' element={<CaptainLogin/>}/>
       <Route path='/UserSignup' element={<UserSignup/>}/>
       <Route path='/UserLogin' element={<UserLogin/>}/>
       <Route path='/CaptainRiding' element={<CaptainRiding/>}/>

       <Route path='/Home' element=
       {
        <UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>
       }
       />
       <Route path='/user/logout' element={
        <UserProtectedWrapper>
  
             <UserLogout/>
        </UserProtectedWrapper>
       }/>
        
        <Route path='/CaptainHome'  element={
            <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }/>
        
           <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
        
      </Routes>
    </div>
  )
}

export default App
