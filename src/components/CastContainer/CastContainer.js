import React from 'react';
import CastCard from '../CastCard/CastCard';

export const CastContainer = (props) => {
  const castCards = props.cast 
  ? props.cast.map(person => <CastCard data={person} />)
  : <p>Loading...</p>;

  return (
    <div>
      {castCards}
    </div>
  );
}
