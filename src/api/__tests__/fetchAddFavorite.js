import { fetchAddFavorite } from '../fetchAddFavorite';
import { serverUrl } from '../pathNames';
import { mockCleanMovie } from '../mockData';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockCleanMovie.id)
}));

mockCleanMovie.user = { id: 1 };
const url = `${serverUrl}/favorites/new`;
const { 
  user, title, overview, posterImg, id, rating, releaseDate 
} = mockCleanMovie;

let poster_path = posterImg.split('500')[1];
const body = {
  movie_id: id, 
  user_id: user.id,
  title, 
  poster_path,
  release_date: releaseDate, 
  vote_average: rating, 
  overview
};
const init = {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' }
};

describe('fetchAddFavorite', () => {
  it('should call fetch with the correct params', () => {
    fetchAddFavorite(mockCleanMovie);
    expect(fetch).toBeCalledWith(url, init);
  });

  it('should return the correct data', async () => {
    const result = await fetchAddFavorite(mockCleanMovie);
    expect(result).toEqual(mockCleanMovie.id);
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false
      })
    );

    try {
      await fetchAddFavorite(mockCleanMovie);
    } catch (error) {
      expect(error.message).toBe("Failed to add favorite");
    }
  });
});