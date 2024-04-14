import React from 'react';
import { useParams } from 'react-router-dom';

function IndividualRaffle({ raffles }) {
  const { id } = useParams();
  const raffle = raffles.find(r => r.id === parseInt(id));

  return (
    <div>
      {raffle ? (
        <div>
          <h2>Raffle Details</h2>
          <p>Name: {raffle.name}</p>
          <p>Description: {raffle.description}</p>
          {/* Add other raffle details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default IndividualRaffle;
