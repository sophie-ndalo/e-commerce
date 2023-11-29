import React, { useState } from 'react';

function PickupLocationForm({ onSelectPickup, onClose }) {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSelect = () => {
    onSelectPickup(selectedLocation); // Pass the selectedLocation to parent component
    localStorage.setItem('selectedLocation', selectedLocation); // Store selected location in local storage
  };

  const handleClose = () => {
    onClose(); // Close the form
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '300px', height: '300px', position: 'relative' }}>
      <button onClick={handleClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>X</button>
      <h3>Select Pickup Location</h3>
      <form>
        <label>
          <input
            type="radio"
            value="Location A"
            checked={selectedLocation === 'Location A'}
            onChange={handleLocationChange}
          />
          Location A
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Location B"
            checked={selectedLocation === 'Location B'}
            onChange={handleLocationChange}
          />
          Location B
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="Location C"
            checked={selectedLocation === 'Location C'}
            onChange={handleLocationChange}
          />
          Location C
        </label>
        <br />
        <button onClick={handleClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>X</button>
        <button onClick={handleSelect} style={{ backgroundColor: 'green', marginTop: '10px' }}>Select Pickup</button>
      </form>
    </div>
  );
}

export default PickupLocationForm;
