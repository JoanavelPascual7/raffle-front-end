import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Participants from '../src/components/Participants';
import RafflesAndParticipants from '../src/components/RafflesAndParticipants';
import AddRaffle from './components/AddRaffle';
import JoinRaffle from './components/JoinRaffle';

function App() {
  const [raffles, setRaffles] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [rafflesWithParticipants, setRafflesWithParticipants] = useState([]);
  const [selectedRaffleName, setSelectedRaffleName] = useState(null);
  const [showAddRaffle, setShowAddRaffle] = useState(false);
  const [showJoinRaffle, setShowJoinRaffle] = useState(false);

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
        setRafflesWithParticipants(response.data.data);
      } catch (error) {
        console.error('Error fetching raffles with participants:', error);
      }
    };

    fetchRaffles();
    fetchParticipants();
    fetchRafflesWithParticipants();
  }, []);

  const handleRaffleClick = (raffleName) => {
    setSelectedRaffleName(raffleName);
  };

  const toggleAddRaffle = () => {
    setShowAddRaffle(!showAddRaffle);
  };

  const toggleJoinRaffle = () => {
    setShowJoinRaffle(!showJoinRaffle);
  };

  return (
    <div className="App">
      <header className="App-header">
        Raffles App
      </header>
      <div className='all-raffles'>
        <h2>Raffles:</h2>
        <ul>
          {raffles.map(raffle => (
            <li key={raffle.id}>
              {raffle.name}
              <button onClick={() => handleRaffleClick(raffle.name)}>View</button>
              <button onClick={toggleJoinRaffle}>Join Raffle</button> 
            </li>
          ))}
        </ul>
        <button onClick={toggleAddRaffle}>Add Event</button>
      </div>
      <Participants participants={participants} />
      {selectedRaffleName && (
        <div>
          <RafflesAndParticipants
            rafflesWithParticipants={rafflesWithParticipants}
            selectedRaffleName={selectedRaffleName}
          />
        </div>
      )}
      {showAddRaffle && <AddRaffle />}
      {showJoinRaffle && <JoinRaffle />} 
    </div>
  );
}

export default App;
