import React from 'react';
import PropTypes from "prop-types";


export default function CastCard(props) {
  const { name, headshot, character, id} = props.data;
  
  return (
    <div className="CastCard">
      <h2>{name}</h2>
      <h2>{character}</h2>
      <img className="headshot" src={headshot} alt={`${name} headshot`} />
    </div>
  );
}

CastCard.propTypes = {
  data: PropTypes.object
};
