import { fetchDiscover } from '../fetchDiscover';

describe('fetchDiscover', () => {
  let mockData;
  let fullURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=c8d18bbe15bf85bf01dba12e0717bacb";
  beforeEach(() => {
    mockData = [{
      title: "Parent Trap",
      id: 1
    }];

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData)
    }));
  });

  it('should call fetch with the correct params', () => {
    fetchDiscover();
    expect(fetch).toHaveBeenCalledWith(fullURL);
  });

  it('should return the correct data', async () => {
    const result = await fetchDiscover();
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }));

    try {
      await fetchDiscover();
    } catch(error) {
      expect(error.message).toBe('Discover failed to fetch')
    }
  });
});