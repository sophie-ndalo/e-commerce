import React, { useState } from 'react';

function DeliveryDetails() {
  const [deliveryOption, setDeliveryOption] = useState('doorDelivery');

  const handleOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  return (
    <div>
      <h2>Delivery Details</h2>

      <div>
        <label>
          <input
            type="radio"
            value="doorDelivery"
            checked={deliveryOption === 'doorDelivery'}
            onChange={handleOptionChange}
          />
          Door Delivery
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="pickupLocation"
            checked={deliveryOption === 'pickupLocation'}
            onChange={handleOptionChange}
          />
          Pickup Location
        </label>
      </div>

      {deliveryOption === 'doorDelivery' && (
        <div>
          <h3>Door Delivery Details</h3>
          {/* Add input fields for door delivery */}
        </div>
      )}

      {deliveryOption === 'pickupLocation' && (
        <div>
          <h3>Pickup Location Details</h3>
          {/* Add input fields for pickup location */}
        </div>
      )}
    </div>
  );
}

export default DeliveryDetails;
