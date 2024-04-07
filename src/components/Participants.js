import React from 'react';

function Participants({ participants }) {
  return (
    <div>
      <h2>Participants:</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant.id}>
            {participant.firstname} {participant.lastname} - {participant.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;
