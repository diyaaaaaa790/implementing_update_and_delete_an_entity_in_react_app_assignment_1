import React, { useState, useEffect } from 'react';

const API_URI = 'https://your-api.com/items'; // Replace with actual API URI

function UpdateItem({ itemId }) {
  const [item, setItem] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  // Fetch the item when the component mounts
  useEffect(() => {
    fetch(`${API_URI}/${itemId}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setUpdatedName(data.name); // initialize with existing name
      })
      .catch(err => console.error('Error fetching item:', err));
  }, [itemId]);

  // Handle input change
  const handleInputChange = (e) => {
    setUpdatedName(e.target.value);
  };

  // Update item in API
  const handleUpdate = () => {
    fetch(`${API_URI}/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setResponseMsg('Item updated successfully!');
      })
      .catch(err => {
        console.error('Update failed:', err);
        setResponseMsg('Update failed!');
      });
  };

  return (
    <div className="update-item">
      <h2>Update Item</h2>
      {item ? (
        <div>
          <p><strong>Current Name:</strong> {item.name}</p>
          <input
            type="text"
            value={updatedName}
            onChange={handleInputChange}
            placeholder="Update name"
          />
          <button onClick={handleUpdate}>Update</button>
          {responseMsg && <p>{responseMsg}</p>}
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
}

export default UpdateItem;
