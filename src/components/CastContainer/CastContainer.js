import React from 'react';
import PropTypes from "prop-types";
import CastCard from '../CastCard/CastCard';

export const CastContainer = (props) => {
  const castCards = props.cast 
  ? props.cast.map(person => <CastCard data={person} key={person.id}/>)
  : <p>Loading...</p>;

  return (
    <div>
      {castCards}
    </div>
  );
}

CastContainer.propTypes = {
  cast: PropTypes.array
};
