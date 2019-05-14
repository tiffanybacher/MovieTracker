import { fetchAllUsers } from "../fetchAllUsers";
import { serverUrl } from "../pathNames";
import { mockUser } from "../mockData";

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    data: [mockUser, mockUser]
  })
}));

describe('fetchAllUsers', () => {
  it('should call fetch with the correct params', () => {
    fetchAllUsers();
    expect(fetch).toBeCalledWith(serverUrl);
  });

  it('should return the correct data', async () => {
    const result = await fetchAllUsers();
    expect(result).toEqual([mockUser, mockUser]);
  });

  it('should throw an error if the fetch fails', async () => {
    window.fetch.mockImplementation(() => 
    Promise.resolve({ ok: false }));
    
    try {
      await fetchAllUsers()
    } catch(error) {
      expect(error.message).toEqual('Failed to fetch all users')
    }
  });
});