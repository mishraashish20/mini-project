import React, { useContext, useRef, useState, useEffect } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';




const Home = () => {
  const[pickup,setPickup]=useState('')
    const[destination,setDestination]=useState('')
    const [panelOpen, setPanelOpen]=useState(false);
    const vehiclePanelRef = useRef(null)
     const vehicleFoundRef = useRef(null)
     const confirmRidePanelRef = useRef(null)
    const panelRef = useRef(null)
    const waitingForDriverRef=useRef(null)


    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
     const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
     const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)
     const [ fare, setFare ] = useState({})

     const navigate = useNavigate()

      const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

 useEffect(() => {
  if (!socket) return;
  if (!user || !user._id) return; // <-- FIXED

  socket.emit("join", { userType: "user", userId: user._id });

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  return () => {
    socket.off("ride-confirmed");
    socket.off("ride-started");
  };
}, [socket, user]);


         

     const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }
      

  const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

  const submitHandler=(e)=>{
    e.preventDefault();

  }

   useGSAP(function(){
    if(panelOpen){
     
      gsap.to(panelRef.current,{
        height: '70%'
      })
    }else{
      gsap.to(panelRef.current,{
        height: '0%'
      })
    }

   } ,[panelOpen])

   useGSAP(function(){
     if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0%)'
   })
  }else{
    gsap.to(vehiclePanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[vehiclePanel])

 useGSAP(function(){
     if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0%)'
   })
  }else{
    gsap.to(confirmRidePanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[confirmRidePanel])

 useGSAP(function(){
     if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0%)'
   })
  }else{
    gsap.to(vehicleFoundRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[vehicleFound]) 

 useGSAP(function(){
     if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0%)'
   })
  }else{
    gsap.to(waitingForDriverRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[waitingForDriver]) 

 async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }


   async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


    }

  return (
    <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://sulcdn.azureedge.net/biz-live/img/resq-10116813-5aef4fc8.jpeg" alt="" />
            <div    className=" h-full w-full object-cover">
              {/* <img src="https://www.bedrockhr.co.uk/wp-content/uploads/2019/07/services1.png" alt="" /> */}
               <LiveTracking />
            </div>
            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative pb-12'>
                    
                    <h4 className='text-2xl font-semibold'>Find an Ambulance</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                        onClick={()=>{
                          setPanelOpen(true)
                           setActiveField('pickup')
                        }}
                           value={pickup}
                           onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add patient location'
                        />
                        <input
                         onClick={()=>{
                          setPanelOpen(true)
                           setActiveField('destination')
                         }}
                        value={destination}
                           onChange={handleDestinationChange}
                          
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Nearest Hospital' />
                    </form>

                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                   
                </div>
                <div ref={panelRef}  className='bg-[#fff] h-0'>
                  <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div  ref={vehiclePanelRef} className='fixed z-12 bottom-0 translate-y-full  bg-white px-3 py-6 w-full'> 
              <VehiclePanel
                    selectVehicle={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>
             <div  ref={confirmRidePanelRef} className='fixed z-12 bottom-0 translate-y-full  bg-white px-3 py-6 w-full'> 
             <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                      fare={fare}
                    vehicleType={vehicleType}

                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>
               <div ref={vehicleFoundRef} className='fixed z-12 bottom-0 translate-y-full  bg-white px-3 py-6 w-full'> 
           <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                     fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound} />
            </div>
              <div ref={waitingForDriverRef} className='fixed z-12 bottom-0 translate-y-full  bg-white px-3 py-6 w-full'> 
            <WaitingForDriver 
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>
            
           
          
    
     </div>
  )
}

export default Home
