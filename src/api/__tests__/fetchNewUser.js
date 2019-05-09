import { fetchSignIn } from "../fetchSignIn";
import { serverUrl } from "../pathNames";

const mockUser = {
  data: {
    id: 1,
    name: "Jacob"
  }
};

const email = "email@email.com";
const password = "password";
const body = JSON.stringify({ email, password });
const init = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body
};
const request = new Request(serverUrl, init);
window.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUser)
  })
);

describe("fetchSignIn", () => {
  it("should call fetch with the correct params", () => {
    fetchSignIn(email, password);
    expect(fetch).toHaveBeenCalledWith(request);
  });

  it("should retrun the correct data", async () => {
    const result = await fetchSignIn(email, password);
    expect(result).toEqual(mockUser.data);
  });

  it("should throw an error if fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false
      })
    );

    try {
      await fetchSignIn(email, password);
    } catch (error) {
      expect(error.message).toBe("Failed to sign in");
    }
  });
});
