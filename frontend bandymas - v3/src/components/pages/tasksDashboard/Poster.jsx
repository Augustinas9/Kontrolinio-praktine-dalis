import React from 'react';

const Poster = ({ poster, onDeletePoster }) => {
  if (!poster) {
    return <div>Loading...</div>; // Handle case where poster is not defined yet or loading
  }

  return (
    <li className="poster-item">
      <div className="poster-name">{poster.name}</div>
      <div className="poster-description">Description: {poster.description}</div>
      <div>Price: {poster.price}</div>
      <div>City: {poster.city}</div>
      <div className="poster-controls">
        <button onClick={() => onDeletePoster(poster.id)}>Delete</button>
      </div>
    </li>
  );
};

export default Poster;
