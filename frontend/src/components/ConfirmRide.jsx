import React from "react";

const ConfirmRide = (props) => {
  return (
    <div className="bg-white p-5 rounded-t-2xl shadow-xl">

     
      <h5
        className="p-2 text-center w-full absolute top-2 left-0 cursor-pointer"
        onClick={() => props.setConfirmRidePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

     
      <h4 className="text-2xl font-bold mt-8 mb-6">
        Confirm Your Ambulance
      </h4>

   
      <div className="flex flex-col items-center">
        <img
          className="h-24 w-24 rounded-full shadow-md object-cover animate-pulse"
          src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
          alt=""
        />
      </div>

      
      <div className="w-full mt-8 space-y-5">

       
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-map-pin-user-fill text-xl text-blue-500"></i>
          <div>
            <h3 className="text-base font-semibold">Pickup Location</h3>
            <p className="text-sm text-gray-600">{props.pickup}</p>
          </div>
        </div>

       
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
          <div>
            <h3 className="text-base font-semibold">Destination</h3>
            <p className="text-sm text-gray-600">{props.destination}</p>
          </div>
        </div>

       
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-currency-line text-xl text-green-600"></i>
          <div>
            <h3 className="text-base font-semibold">
              ₹{props.fare[props.vehicleType]}
            </h3>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>

   
      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
          props.createRide();
        }}
        className="w-full bg-green-600 text-white font-semibold p-3 mt-8 rounded-xl 
                   active:bg-green-700 transition-all shadow-md"
      >
        Confirm Ride
      </button>

    </div>
  );
};

export default ConfirmRide;
