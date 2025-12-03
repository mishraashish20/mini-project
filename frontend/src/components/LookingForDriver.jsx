import React from "react";

const LookingForDriver = (props) => {
  return (
    <div className="bg-white p-5 rounded-t-2xl shadow-xl">

      {/* Close Button */}
      <h5
        className="p-2 text-center w-full absolute top-2 left-0 cursor-pointer"
        onClick={() => props.setVehicleFound(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Heading */}
      <h4 className="text-2xl font-bold mt-8 mb-6">
        Looking for a Driver…
      </h4>

      {/* Image + Searching glow animation (CSS from Tailwind) */}
      <div className="flex flex-col items-center justify-center">
        <img
          className="h-24 w-24 rounded-full shadow-md animate-pulse"
          src="https://img.freepik.com/premium-photo/male-ambulance-driver-character-illustration-ai-generated_283836-760.jpg"
          alt="driver-search"
        />
      </div>

      {/* Info Card */}
      <div className="w-full mt-8 space-y-5">

        {/* Pickup */}
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-map-pin-user-fill text-xl text-blue-500"></i>
          <div>
            <h3 className="text-base font-semibold">Pickup Location</h3>
            <p className="text-sm text-gray-600">{props.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
          <div>
            <h3 className="text-base font-semibold">Destination</h3>
            <p className="text-sm text-gray-600">{props.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm">
          <i className="ri-currency-line text-xl text-green-600"></i>
          <div>
            <h3 className="text-base font-semibold">
              ₹{props.fare[props.vehicleType]??0}
            </h3>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      {/* Searching message */}
      <p className="text-center mt-6 text-gray-500 text-sm animate-pulse">
        Finding the nearest available driver…
      </p>
    </div>
  );
};

export default LookingForDriver;
