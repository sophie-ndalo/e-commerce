import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Delete from "./Delete";

function SingleitemAdmin() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setEditedData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement the logic for handling edits here
    // You can send the edited data to your server or update it in the frontend.

    // After saving, exit the edit mode
    setIsEditing(false);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="card" style={{
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      width: '700px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      marginTop: '150px',
      marginLeft: '500px',
    }}>
      {item && (
        <div >
          <img
            src={item.image}
            alt={item.title}
            style={{ maxWidth: '50%', height: '50%', marginLeft: "150px" }}
          />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          <Delete/>
          {isEditing ? (
            <div style={{ textAlign: "center" }}>
              <form style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "16px" }}>
                  Title:
                </label>
                <input
                  type="text"
                  value={editedData.title}
                  onChange={(e) =>
                    setEditedData({ ...editedData, title: e.target.value })
                  }
                  style={{ width: "100%", padding: "5px" ,borderRadius: "5px"}}
                />
              </form>
              <form style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "16px", }}>
                  Description:
                </label>
                <input
                  type="text"
                  value={editedData.description}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      description: e.target.value,
                    })
                  }
                  style={{ width: "100%", padding: "5px",borderRadius: "5px" }}
                />
              </form>
              <form style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "16px", }}>
                  Price:
                </label>
                <input
                  type="number"
                  value={editedData.price}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                />
              </form>
              <form style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "16px", }}>
                  Category:
                </label>
                <input
                  type="text"
                  value={editedData.category}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      category: (e.target.value),
                    })
                  }
                  style={{ width: "100%", padding: "5px" ,borderRadius: "5px"}}
                />
              </form>
              <button
                onClick={handleSaveClick}
                style={{
                  background: "green",
                  color: "white",
                  padding: "10px 20px",
                  margin: "5px",
                  cursor: "pointer",
                  fontFamily: "'Roboto Slab', serif",
                  borderRadius: "5px",
                }}
              >
                Save
              </button>
              <button
                onClick={handleCloseClick}
                style={{
                  background: "red",
                  color: "white",
                  padding: "10px 20px",
                  margin: "5px",
                  cursor: "pointer",
                  fontFamily: "'Roboto Slab', serif", 
                  borderRadius: "5px",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              style={{width: "100px",height: "40px", borderRadius: "5px",backgroundColor: "#7A4988", fontSize: "18px", color: "white", marginLeft: "30px", fontFamily: "'Roboto Slab', serif"
             }}
            >
              Edit
            </button>
          )}
        </div>
      )}
      {!item && <p>Loading...</p>}
    </div>
  );
}

export default SingleitemAdmin;
