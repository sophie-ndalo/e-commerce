import React, { useState } from 'react';

function Edit({ itemId, onEdit, initialData, onClose }) {
  // Initialize state for edited data
  const [editedData, setEditedData] = useState({ ...initialData });

  // Handle the edit action by sending a PUT request
  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        // If the request was successful, call the onEdit callback to update the frontend
        onEdit(itemId, editedData);
        onClose(); // Close the editing mode
      } else {
        console.error('Failed to edit item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle changes in input fields
  const handleFieldChange = (fieldName, value) => {
    setEditedData({ ...editedData, [fieldName]: value });
  };

  return (
    <div>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={editedData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={editedData.price}
            onChange={(e) => handleFieldChange('price', parseFloat(e.target.value))}
          />
        </div>
      </form>
      <button onClick={handleEdit}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Edit;
