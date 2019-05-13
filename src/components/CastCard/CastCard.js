import React from 'react';

export default function CastCard(props) {
  const { name, headshot, character, id} = props.data;
  
  return (
    <div>
      <h2>{name}</h2>
      <h2>{character}</h2>
      <img className="headshot" src={headshot} alt={`${name} headshot`} />
    </div>
  );
}
