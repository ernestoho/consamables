export const TokenManager = {
  storeAccessToken: accessToken => localStorage.setItem('accessToken', accessToken),
  retrieveAccessToken: () => localStorage.getItem('accessToken'),
  clearAccessToken: () => localStorage.removeItem('accessToken'),
};

export const buildPostRequest = (data, auth = true) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: auth ? `Bearer ${TokenManager.retrieveAccessToken()}` : undefined,
  }),
});

export const buildGetRequest = () => ({
  method: 'GET',
  headers: new Headers({
    Authorization: `Bearer ${TokenManager.retrieveAccessToken()}`,
  }),
});
