import fetchMoviePeople from "../fetchMoviePeople";
import { baseUrl } from "../pathNames";
import { jacobKey } from "../../utils/API-logins";
import { uncleanPeople } from './mockData';

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(uncleanPeople)
}));
const mockId = 11111;

describe('fetchMoviePeople', () => {
  it('should call fetch with the correct params', () => {
    const expectedUrl = `${baseUrl}movie/${mockId}/credits${jacobKey}`;
    
    fetchMoviePeople(mockId);
    expect(fetch).toBeCalledWith(expectedUrl);
  });

  it('should return the correct data', async () => {
    const result = await fetchMoviePeople(mockId);
    expect(result).toEqual(uncleanPeople);
  });

  it('should throw an error if the fetch fails', async () => {
    window.fetch.mockImplementation(() => Promise.resolve({ ok: false}));
    try {
      await fetchMoviePeople(mockId)
    } catch(error) {
      expect(error.message).toEqual('Failed to fetch movie cast and crew')
    }
  });
});