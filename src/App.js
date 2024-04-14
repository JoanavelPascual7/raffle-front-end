import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Participants from '../src/components/Participants';
import RafflesAndParticipants from '../src/components/RafflesAndParticipants';
import IndividualRaffle from '../src/components/IndividualRaffle';

function App() {
  const [raffles, setRaffles] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [rafflesWithParticipants, setRafflesWithParticipants] = useState([]);
  const [selectedRaffleId, setSelectedRaffleId] = useState(null);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/raffles`);
        setRaffles(response.data.data);
      } catch (error) {
        console.error('Error fetching raffles:', error);
      }
    };

    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/participants`);
        setParticipants(response.data.data);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    const fetchRafflesWithParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/raffles-with-participants`);
        console.log('Response data:', response.data.data);
        const rafflesWithParticipantsData = response.data.data;
        setRafflesWithParticipants(rafflesWithParticipantsData);
        console.log('Raffles with participants:', rafflesWithParticipantsData);
      } catch (error) {
        console.error('Error fetching raffles with participants:', error);
      }
    };

    fetchRaffles();
    fetchParticipants();
    fetchRafflesWithParticipants();
  }, []);

  const handleRaffleClick = (raffleId) => {
    setSelectedRaffleId(raffleId);
  };

  return (
    <div className="App">
      <header className="App-header">
        Raffles App
      </header>
      <div className='all-raffles'>
        <h2>All Raffles:</h2>
        <ul>
          {raffles.map(raffle => (
            <li key={raffle.id}>
              {raffle.name}
              {/* Add a button to view individual raffle */}
              <button onClick={() => handleRaffleClick(raffle.id)}>View</button>
            </li>
          ))}
        </ul>
      </div>
      <Participants participants={participants} />
      {selectedRaffleId && (
        <IndividualRaffle
          raffles={raffles}
          raffleId={selectedRaffleId}
        />
      )}
      {rafflesWithParticipants.length > 0 && (
        <RafflesAndParticipants
          rafflesWithParticipants={rafflesWithParticipants}
        />
      )}
    </div>
  );
}

export default App;
