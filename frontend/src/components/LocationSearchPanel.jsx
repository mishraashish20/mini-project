import React from 'react';

const LocationSearchPanel = ({
  suggestions = [],
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }

    setVehiclePanel(true);
    setPanelOpen(false);
  };

  return (
    <div className="m-2">
      {suggestions.length === 0 && (
        <p className="text-gray-400 text-sm text-center">No suggestions found...</p>
      )}

      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex p-3 rounded-xl bg-white border hover:border-black transition cursor-pointer mb-2 items-center"
        >
          <i className="ri-map-pin-line text-xl text-gray-600 mr-3"></i>
          <h4 className="text-base">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
