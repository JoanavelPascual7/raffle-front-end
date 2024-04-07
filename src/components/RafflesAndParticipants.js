import React from "react";

const RafflesAndParticipants = ({ rafflesWithParticipants }) => {
  const groupedParticipants = {};
  rafflesWithParticipants.forEach(participant => {
    if (!groupedParticipants[participant.name]) {
      groupedParticipants[participant.name] = [];
    }
    groupedParticipants[participant.name].push(participant);
  });

  return (
    <div>
      <h2>Raffles and Participants:</h2>
      {Object.entries(groupedParticipants).map(([raffleName, participants], index) => (
        <div key={index}>
          <h3>Raffle: {raffleName}</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>
                Name: {participant.firstname} {participant.lastname}, Email: {participant.email}, Phone: {participant.phone}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RafflesAndParticipants;

