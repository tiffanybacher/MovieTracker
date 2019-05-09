import React from 'react'

export const MovieDetails = (props) => {
  const { title, overview, posterImg, id, rating, releaseDate } = props.movieDetails;
  const { director, writer, cast } = props.people;
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}
