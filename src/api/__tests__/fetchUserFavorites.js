import { fetchUserFavorites } from "../fetchUserFavorites";
import { serverUrl } from "../pathNames";
import { mockCleanMovie } from "../mockData";

const mockFavoritedMovies = [mockCleanMovie, mockCleanMovie]

window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({data: mockFavoritedMovies})
  })
);

describe("fetchUserFavories", () => {
  it("should call fetch with the correct params", () => {
    const mockUrl = `${serverUrl}/1/favorites`;
    fetchUserFavorites(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });

  it("should retrun the correct data", async () => {
    const result = await fetchUserFavorites(1);
    expect(result).toEqual(mockFavoritedMovies);
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false
      })
    );

    try {
      await fetchUserFavorites(1);
    } catch (error) {
      expect(error.message).toBe("Failed to fetch user favorites");
    }
  });
});
