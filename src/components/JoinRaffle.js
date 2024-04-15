import React, { useState } from 'react';
import axios from 'axios';

function JoinRaffle({ raffleId }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleJoinRaffle = async () => {
    try {
      // Check if the participant already exists
      const participantExists = await axios.get(`${process.env.REACT_APP_API_URL}/api/participants?email=${email}`);
      
      if (participantExists.data.length === 0) {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/participants`, {
          firstname,
          lastname,
          email,
          phone
        });
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/raffles/${raffleId}/participants`, {
        firstname,
        lastname,
        email,
        phone
      });

      setFirstname('');
      setLastname('');
      setEmail('');
      setPhone('');

      alert('Successfully joined the raffle!');
    } catch (error) {
      console.error('Error joining raffle:', error);
    }
  };

  return (
    <div>
      <h2>Join Raffle</h2>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <button onClick={handleJoinRaffle}>Join Raffle</button>
    </div>
  );
}

export default JoinRaffle;
