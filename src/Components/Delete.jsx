import React, { useState } from 'react';

function Delete({ itemId, onDelete }) {
  const handleDelete = () => {
    // Send a DELETE request to the backend to delete the item
    fetch(`/api/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the request was successful, call the onDelete callback to update the frontend
          onDelete(itemId);
        } else {
          console.error('Failed to delete item');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <button onClick={handleDelete} style={{width: "100px",height: "40px", marginBottom: "20px", borderRadius: "5px",backgroundColor: "red", fontSize: "18px", color: "white" }}>Delete</button>
  );
}

export default Delete;
