import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PickupLocationForm from './PickupLocationForm';

function DeliveryDetails() {
  const [deliveryOption, setDeliveryOption] = useState('doorDelivery');
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState('');

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
    setShowPickupForm(false); // Hide the PickupLocationForm when the delivery option changes
    setSelectedPickupLocation(''); // Clear selected location when changing options
  };

  const handleSelectPickup = () => {
    setShowPickupForm(true); // Show the PickupLocationForm when the "Select pick up location" link is clicked
  };

  const handleSelectedLocation = (location) => {
    setSelectedPickupLocation(location); // Update selected location when received from PickupLocationForm
    localStorage.setItem('selectedLocation', location); // Store selected location in local storage
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem('selectedLocation');
    if (storedLocation) {
      setSelectedPickupLocation(storedLocation);
    }
  }, []);

  return (
    <div style={{ height: '600px', backgroundColor: 'red', width: '50%', marginTop: '150px', marginLeft: '25%' }}>
      <h2>Delivery Details</h2>

      <div>
        <label style={{ marginLeft: '45px' }}>
          <input
            type="radio"
            value="doorDelivery"
            checked={deliveryOption === 'doorDelivery'}
            onChange={handleOptionChange}
          />
          Door Delivery
        </label>
        <div className='door-delivery' style={{ backgroundColor: 'yellow', padding: '10px', height: '100px', width: '90%', marginLeft: '45px' }}>
          Additional details for door delivery
        </div>
        <div className='location-update' style={{ backgroundColor: 'pink', padding: '10px', height: '100px', width: '90%', marginLeft: '45px', marginTop: '20px' }}>
          <p>door delivery details</p>
        </div>
      </div>

      <div>
        <label style={{ marginLeft: '45px' }}>
          <input
            type="radio"
            value="pickupLocation"
            checked={deliveryOption === 'pickupLocation'}
            onChange={handleOptionChange}
          />
          Pickup Location
        </label>
        <div style={{ backgroundColor: 'yellow', padding: '10px', height: '100px', width: '90%', marginLeft: '45px' }}>
          {/* Use onClick to show the PickupLocationForm */}
          <p onClick={handleSelectPickup} style={{ cursor: 'pointer' }}>
            Select pick up location
          </p>
        </div>
        {/* Render PickupLocationForm conditionally */}
        {deliveryOption === 'pickupLocation' && showPickupForm && <PickupLocationForm onSelectPickup={handleSelectedLocation} />}
        
        {/* selected delivery method */}
        <div className='selected-pickup' style={{ backgroundColor: 'pink', padding: '10px', height: '100px', width: '90%', marginLeft: '45px', marginTop: '20px' }}>
          <p>{selectedPickupLocation || 'Placeholder Location'}</p>
        </div>
        {/* Link to the payment methods page */}
        <Link to="/paymentmethods">
          <button style={{ marginTop: '20px', backgroundColor: 'yellowgreen', marginLeft: "700px", width: "200px", height: "50px", borderRadius: "5px" }}>Confirm Payment Method</button>
        </Link>
      </div>
    </div>
  );
}

export default DeliveryDetails;
