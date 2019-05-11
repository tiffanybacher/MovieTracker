import { serverUrl } from "../api/pathNames";
import { deleteUserFavorite } from "../actions";

export const fetchDeleteFavorite = (user_id, movie_id) => {
  const url = `${serverUrl}/${user_id}/favorites/${movie_id}`;
  const body = { user_id, movie_id };
  const init = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return (dispatch) => {
    fetch(url, init)
      .then(response => {
        if (!response.ok) {
          throw Error("Failed to delete favorite");
        } else {
          return response.json();
        }
      })
      .then(result => {
        console.log(result);
        dispatch(deleteUserFavorite(movie_id));
      })
      .catch(error => console.log(error));
    ;
  };
};