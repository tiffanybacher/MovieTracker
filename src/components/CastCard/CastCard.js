import React from 'react';

export default function CastCard(props) {
  const { name, headshot, character } = props.data;
  
  return (
    <div className="CastCard">
      <img className="headshot" src={headshot} alt={`${name} headshot`} />
      <h3>{name}</h3>
      <p>{character}</p>
    </div>
  );
}
