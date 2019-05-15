import React from 'react';
import PropTypes from "prop-types";


export default function CastCard(props) {
  const { name, headshot, character, id} = props.data;
  
  return (
    <div className="CastCard">
      <img className="headshot" src={headshot} alt={`${name} headshot`} />
      <h3>{name}</h3>
      <p>{character}</p>
    </div>
  );
}

CastCard.propTypes = {
  data: PropTypes.object
};
