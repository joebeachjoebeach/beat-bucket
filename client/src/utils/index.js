// GENERAL UTILS
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const WEB_BASE_URL = process.env.REACT_APP_WEB_URL;

export function useRefreshToken({ success, failure }) {
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
      .catch(err => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        failure(err);
      });
  }
}

export function authRequest(method, path, data, handlers) {
  axios[method](
    `${API_BASE_URL}${path}`,
    data
  )
    .then(res => {
      handlers.success(res);
    })
    .catch(err => {
      handlers.failure(err);
    });
}

export function register(data, handlers) {
  axios.post(`${API_BASE_URL}auth/register`, data)
    .then(res => {
      handlers.success(res);
    })
    .catch(err => {
      handlers.failure(err);
    });
}

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

export function resourceRequest(method, path, handlers, data) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    // we may or may not be sending data
    (
      data
        ? axios[method](
          `${API_BASE_URL}${path}`,
          data,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        : axios[method](
          `${API_BASE_URL}${path}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
    )
      .then(res => {
        handlers.success(res);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        const { refreshToken } = localStorage.getItem('refreshToken');
        if (refreshToken) {
          axios.get(
            `${API_BASE_URL}authenticate`,
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          )
            .then(res => {
              const { accessToken, refreshToken } = res.data;
              localStorage.setItem('accessToken', accessToken);
              refreshToken && localStorage.setItem('refreshToken', refreshToken);
              axios[method](
                `${API_BASE_URL}${path}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
              )
                .then(res => {
                  handlers.success(res);
                })
                .catch(err => {
                  handlers.failure(err);
                });
            })
            .catch(err => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              handlers.authFailure(err);
            });
        }
        else {
          handlers.authFailure();
        }
      });
  }
}

export function getSharedProject(id, handlers) {
  axios.get(`${API_BASE_URL}project/shared/${id}`)
    .then(res => { handlers.success(res); })
    .catch(err => { handlers.failure(err); });
}


