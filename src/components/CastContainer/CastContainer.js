import React from 'react'
import CastCard from '../CastCard/CastCard';

export const CastContainer = (props) => {
  const castCards = props.cast.map(person => 
    <CastCard data={person} />
    )
  return (
    <div>
      {castCards}
    </div>
  )
}
