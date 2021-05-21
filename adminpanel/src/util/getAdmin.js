import axios from 'axios'
import store from '../store'
import {LOGOUT} from '../action/types'


const getAdmin = axios.create({
    baseURL: 'http://localhost:5000/admin',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    }
})
getAdmin.interceptors.response.use((res )  => res,
    (err) => {
      if (err.response.status === 401 ) {      
      store.dispatch({ type: LOGOUT });
      }
      return Promise.reject(err);
    }
  );



export {getAdmin};