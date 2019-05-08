export const fetchSignIn = (email, password) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      email, password
    }
  }
  fetch("http://localhost:3000/api/users", request)
    .then(response => response.json())
    .then(data => console.log(data))
}