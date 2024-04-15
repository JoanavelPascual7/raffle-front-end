import React, { useState } from 'react';
import axios from 'axios';

function AddRaffle() {
  const [name, setName] = useState('');
  const [secretToken, setSecretToken] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/raffles`, {
        name,
        secret_token: secretToken 
      });
      console.log('Raffle added successfully:', response.data);
      setName('');
      setSecretToken('');
    } catch (error) {
      console.error('Error adding raffle:', error);

    }
  };

  return (
    <div>
      <h2>Add Raffle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Raffle Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="secretToken">Secret Token:</label>
          <input type="text" id="secretToken" value={secretToken} onChange={(e) => setSecretToken(e.target.value)} />
        </div>
        <button type="submit">Add Raffle</button>
      </form>
    </div>
  );
}

export default AddRaffle;
