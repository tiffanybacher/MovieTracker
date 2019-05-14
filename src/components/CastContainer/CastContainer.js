import React from 'react';
import CastCard from '../CastCard/CastCard';

export const CastContainer = (props) => {
  let castCards;

  if (props.cast) {
    const topFiveCast = props.cast.slice(0, 6);
    castCards = topFiveCast.map(person => <CastCard data={person} />);
  } else {
    castCards = <p>Loading...</p>
  }

  return (
    <section className="more-details-bottom">
      <h2>Cast</h2>
      <div className="flex-wrapper">
        <div className="CastContainer">
          {castCards}
        </div>
      </div>
    </section>
  );
}
