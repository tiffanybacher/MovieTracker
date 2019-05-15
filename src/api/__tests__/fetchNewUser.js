import { fetchNewUser } from '../fetchNewUser';
import { serverUrl } from '../pathNames';

const mockUser = { id: 1 };
const email = 'email@email.com';
const name = 'Jacob';
const password = 'password';
const body = JSON.stringify({ email, name, password });
const init = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body
};
const request = new Request(`${serverUrl}/new`, init);

window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUser)
  })
);

describe('fetchNewUser', () => {
  it('should call fetch with the correct params', () => {
    fetchNewUser(email, name, password);
    expect(fetch).toHaveBeenCalledWith(request);
  });

  it('should retrun the correct data', async () => {
    const result = await fetchNewUser(email, name, password);
    expect(result).toEqual(mockUser.id);
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false
      })
    );

    try {
      await fetchNewUser(email, name, password);
    } catch (error) {
      expect(error.message).toBe('Failed to create account');
    };
  });
});
