import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

   
    if (!captain) {
        return (
            <div className="flex justify-center items-center h-24">
                <p className="text-gray-500">Loading captain details...</p>
            </div>
        )
    }

    const fullName = `${captain.fullname?.firstname || ''} ${captain.fullname?.lastname || ''}`

    return (
        <div>
           
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img
                        className='h-10 w-10 rounded-full object-cover'
                        src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                        alt="Captain"
                    />
                    <h4 className='text-lg font-medium capitalize'>{fullName}</h4>
                </div>
            </div>

         
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Rides Completed</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>9</h5>
                    <p className='text-sm text-gray-600'>Customer Rating</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
