import './App.css';
import axios from "axios"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [raffles, setRaffles] = useState([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/raffles`);
        setRaffles(response.data.data);
      } catch (error) {
        console.error("Error fetching raffles:", error);
      }
    };
    fetchRaffles();
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
    </div>
  );
}

export default App;
