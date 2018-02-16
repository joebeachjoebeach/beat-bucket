// GENERAL UTILS
import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_API_URL;
export const WEB_BASE_URL = process.env.REACT_APP_WEB_URL;

export function authRefreshToken({ success, failure }) {
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
        success(res);
      })
      .catch(err => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        failure(err);
      });
  }
  else
    failure();
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

export function login(data, handlers) {
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

export function resourceRequest(method, path, handlers) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    axios[method](
      `${API_BASE_URL}${path}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
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
  else {
    console.log('no access token');
  }
}


