import React from "react";
import "../css/rafflesandparticipants.css";

const RafflesAndParticipants = ({ rafflesWithParticipants, selectedRaffleName }) => {
  // Filter the rafflesWithParticipants data based on the selected raffle name
  const raffle = rafflesWithParticipants.find(raffle => raffle.name === selectedRaffleName);

  if (!raffle) {
    return <p>No participants found for the selected raffle.</p>;
  }

  return (
    <div className="rAndp-container">
      <h2>Raffle Details</h2>
      <h3>{raffle.name}</h3>
      <h3>Participants:</h3>
      <ul>
        {raffle.participants.map((participant, index) => (
          <li key={index}>
            Name: {participant.firstname} {participant.lastname}, 
            Email: {participant.email}, 
            Phone: {participant.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RafflesAndParticipants;

