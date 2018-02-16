// GENERAL UTILS
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const WEB_BASE_URL = process.env.REACT_APP_WEB_URL;

// uses the refresh token to get user data and access token
export function useRefreshToken({ success }) {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    axios.get(
      `${API_BASE_URL}auth/authenticate`,
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )
      .then(res => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        refreshToken && localStorage.setItem('refreshToken', refreshToken);
        success(res);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
}

// registers a new user
export function register(data, handlers) {
  axios.post(`${API_BASE_URL}auth/register`, data)
    .then(res => {
      handlers.success(res);
    })
    .catch(err => {
      handlers.failure(err);
    });
}

// signs a user in
export function signIn(data, handlers) {
  axios.post(`${API_BASE_URL}auth/login`, data)
    .then(res => {
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      handlers.success(res);
    })
    .catch(err => {
      handlers.failure(err);
    });
}

// handles all requests to the resource server where authentication is required
// if the access token fails, it will use the refresh to get a new access token
// and try the request again
export function resourceRequest(method, path, handlers, data) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    buildRequest(method, path, handlers, accessToken, data)
      .then(res => {
        handlers.success(res);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          axios.get(
            `${API_BASE_URL}auth/authenticate`,
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          )
            .then(res => {
              const { accessToken, refreshToken } = res.data;
              localStorage.setItem('accessToken', accessToken);
              refreshToken && localStorage.setItem('refreshToken', refreshToken);
              buildRequest(method, path, handlers, accessToken, data)
                .then(res => { handlers.success(res); })
                .catch(err => { handlers.failure(err); });
            })
            .catch(err => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              handlers.authFailure(err);
            });
        }
      });
  }
}

// sends a request with data if provided, without if not, and returns a promise
function buildRequest(method, path, handlers, accessToken, data) {
  if (data) {
    return axios[method](
      `${API_BASE_URL}${path}`,
      data,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  }

  return axios[method](
    `${API_BASE_URL}${path}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

// gets a shared project (no authentication required for this)
export function getSharedProject(id, handlers) {
  axios.get(`${API_BASE_URL}project/shared/${id}`)
    .then(res => { handlers.success(res); })
    .catch(err => { handlers.failure(err); });
}
