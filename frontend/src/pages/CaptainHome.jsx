import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'

import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopup from '../components/ConfirmRidePopup'

import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  // --- Socket join and location updates ---
  useEffect(() => {
    if (!captain) return

    // Join socket room
    socket.emit('join', { userId: captain._id, userType: 'captain' })

    // Update location
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
        })
      }
    }

    updateLocation()
    const locationInterval = setInterval(updateLocation, 10000)

    return () => clearInterval(locationInterval)
  }, [captain, socket])

  // --- Listen for new rides ---
  useEffect(() => {
    const handleNewRide = (data) => {
      setRide(data)
      setRidePopupPanel(true)
    }

    socket.on('new-ride', handleNewRide)
    return () => socket.off('new-ride', handleNewRide)
  }, [socket])

  // --- Confirm ride ---
  const confirmRide = async () => {
    if (!ride || !captain) return

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: ride._id, captainId: captain._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (err) {
      console.error('Error confirming ride:', err)
    }
  }

  // --- GSAP animations for ride popup ---
  useGSAP(() => {
    if (ridePopupPanelRef.current) {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? 'translateY(0%)' : 'translateY(100%)',
        duration: 0.5,
      })
    }
  }, [ridePopupPanel])

  // --- GSAP animations for confirm ride popup ---
  useGSAP(() => {
    if (confirmRidePopupPanelRef.current) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: confirmRidePopupPanel ? 'translateY(0%)' : 'translateY(100%)',
        duration: 0.5,
      })
    }
  }, [confirmRidePopupPanel])

  // --- Render ---
  return (
    <div className="h-screen relative">
      {/* Top bar */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen bg-white z-20">
        <img
          className="w-16"
          src="https://sulcdn.azureedge.net/biz-live/img/resq-10116813-5aef4fc8.jpeg"
          alt="Logo"
        />
        <Link
          to="/captain/logout"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Hero image */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://www.bedrockhr.co.uk/wp-content/uploads/2019/07/services1.png"
          alt="Hero"
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">{captain && <CaptainDetails />}</div>

      {/* Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed w-full z-30 bottom-0 bg-white px-3 py-10 pt-12 shadow-xl"
      >
        {ride && (
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        )}
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed w-full h-screen z-40 bottom-0 bg-white px-3 py-10 pt-12 shadow-xl"
      >
        {ride && (
          <ConfirmRidePopup
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        )}
      </div>
    </div>
  )
}

export default CaptainHome
