import axios from 'axios'
import store from '../store'


const getAdmin = axios.create({
    baseURL: 'http://localhost:5000/admin',
    headers: {
    'Content-Type': 'application/json'
    }
})
getAdmin.interceptors.response.use((res )  => res,
    (err) => {
      if (err.response.status === 401 ) {      
      //  store.dispatch({ type: LOGOUT });
      }
      return Promise.reject(err);
    }
  );



export {getAdmin};