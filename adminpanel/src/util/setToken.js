import {getAdmin} from './getAdmin';

export const setToken  = (token)  => {
  if (token) {
    getAdmin.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete getAdmin.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};