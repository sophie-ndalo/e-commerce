import React, { useState } from 'react';

function AddItem() {
  // Define state variables for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create an object with the form data
    const formData = {
      title,
      description,
      price: parseFloat(price), // Convert price to a number
      category,
    };

    // Send a POST request to the server
    fetch
      .post('https://your-api-endpoint.com/add-item', formData)
      .then((response) => {
        console.log('Item added successfully:', response.data);

        // Optionally, you can clear the form inputs
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };
  return (
    <div style={{ marginLeft: "35%", marginTop:"100px"}}>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginLeft: "55px", width: "40%", height: "40px", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginLeft: "10px", width: "40%", height: "40px", marginTop: "20px", borderRadius: "5px" }}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ marginLeft: "50px", width: "40%", height: "40px", marginTop: "20px", borderRadius: "5px"}}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ marginLeft: "25px", width: "40%", height: "40px", marginTop: "20px", borderRadius: "5px"}}
          />
        </div>
        <button type="submit" style={{ marginLeft: "250px", marginTop: "20px", height: "30px", width: "60px", backgroundColor:"#7A4988", color: "white", borderRadius: "5px"}}>Submit</button>
      </form>
    </div>
  );
}

export default AddItem;
