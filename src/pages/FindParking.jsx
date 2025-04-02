import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const FindParking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  const [parkingLots] = useOutletContext();

  const filteredLots = Object.entries(parkingLots || {}).filter(([_, lot]) => {
    const matchesSearch = lot.Name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVehicleType = selectedVehicleType === 'all' || lot.vehicleTypes.includes(selectedVehicleType);
    return matchesSearch && matchesVehicleType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Parking spaces:</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍Search Parking Lot..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="vehicleType" className="block mb-2">Vehicle Type:</label>
        <select
          id="vehicleType"
          aria-label="Vehicle Type"
          className="w-full p-2 border rounded"
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Truck">Truck</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLots.map(([id, lot]) => (
          <div key={id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{lot.Name}</h2>
            <p className="text-gray-600 mb-2">{lot.location}</p>
            <div className="flex justify-between mb-2">
              <span>Available: <span data-testid="available-spots">{lot.availableSpots}</span>/{lot.capacity}</span>
              <span>Rating: {lot.rating?.avgrate || 'N/A'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lot.vehicleTypes.map((type) => (
                <span key={type} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindParking;