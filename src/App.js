import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Participants from '../src/components/Participants';
import RafflesAndParticipants from '../src/components/RafflesAndParticipants'; 

function App() {
  const [raffles, setRaffles] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [rafflesWithParticipants, setRafflesWithParticipants] = useState([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/raffles`);
        setRaffles(response.data.data);
      } catch (error) {
        console.error("Error fetching raffles:", error);
      }
    };

    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/participants`);
        setParticipants(response.data.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    const fetchRafflesWithParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/raffles-with-participants`);
        console.log("Response data:", response.data.data);
        const rafflesWithParticipantsData = response.data.data;
        setRafflesWithParticipants(rafflesWithParticipantsData);
        console.log("Raffles with participants:", rafflesWithParticipantsData);
      } catch (error) {
        console.error("Error fetching raffles with participants:", error);
      }
    };
    

    fetchRaffles();
    fetchParticipants();
    fetchRafflesWithParticipants();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        My Raffles App
      </header>
      <div>
        <h2>All Raffles:</h2>
        <ul>
          {raffles.map(raffle => (
            <li key={raffle.id}>{raffle.name}</li>
          ))}
        </ul>
      </div>
      <Participants participants={participants} />
      {rafflesWithParticipants.length > 0 && <RafflesAndParticipants rafflesWithParticipants={rafflesWithParticipants} />}
    </div>
  );
}

export default App;
