import React from 'react';

function ConfirmRemove({ handleConfirm, onCancel, removeFromLocalStorage }) {
  

  return (
    <div style={{ /* Your styling */ }}>
      <p>Do you really want to remove this item from the cart?</p>
      <button style={{ marginRight: '10px', backgroundColor: "red" }} onClick={handleConfirm}>
        REMOVE ITEM
      </button>
      <button onClick={onCancel}>X</button>
    </div>
  );
}

export default ConfirmRemove;
