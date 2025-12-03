import React from "react";

const VehiclePanel = (props) => {
  const fare = props.fare || {}; // Default safe

  return (
    <div className="bg-white p-5 rounded-t-2xl shadow-xl">

      {/* Close Button */}
      <h5
        className="p-2 text-center w-full absolute top-2 left-0 cursor-pointer"
        onClick={() => props.setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Heading */}
      <h4 className="text-2xl font-bold mb-6 mt-8">Choose Ambulance Type</h4>

      {/* MINI */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("mini");
        }}
        className="flex items-center justify-between w-full p-4 mb-4 rounded-xl
                   bg-gray-50 shadow-sm hover:shadow-md cursor-pointer transition border border-transparent
                   active:border-black"
      >
        <img
          className="h-14 w-14 rounded-lg object-cover"
          src="https://tse3.mm.bing.net/th/id/OIP.03uvf5wiFlNtQrXqis6iCAAAAA?pid=Api&P=0&h=180"
          alt=""
        />

        <div className="w-4/5 px-3">
          <h4 className="font-semibold text-lg">Ambulance Mini</h4>
          <h5 className="text-sm text-gray-500">2 mins away</h5>
          <p className="text-xs text-gray-600">Emergency quick response</p>
        </div>

        <h2 className="text-lg font-bold text-gray-700">₹{fare.mini ?? 0}</h2>
      </div>

      {/* LARGE */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.selectVehicle("large");
        }}
        className="flex items-center justify-between w-full p-4 rounded-xl
                   bg-gray-50 shadow-sm hover:shadow-md cursor-pointer transition border border-transparent
                   active:border-black"
      >
        <img
          className="h-14 w-14 rounded-lg object-cover"
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/16807/ambulance-clipart-xl.png"
          alt=""
        />

        <div className="w-4/5 px-3">
          <h4 className="font-semibold text-lg">Ambulance Large</h4>
          <h5 className="text-sm text-gray-500">2 mins away</h5>
          <p className="text-xs text-gray-600">Spacious for emergencies</p>
        </div>

        <h2 className="text-lg font-bold text-gray-700">₹{fare.large ?? 0}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
