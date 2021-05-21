import {getAdmin} from '../util/getAdmin'
import {
  GET_PROFILE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  SET_ALERT
} from './types';
import store from '../store'

export const loadAdmin  = async () => {
  try {
    const res = await getAdmin.get('/api/access');    
    store.dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    store.dispatch({
      type: AUTH_ERROR
    });
}
}

export const RegisterController = async formData =>{
  var {email, name, password} = formData;
  try {
    var dataSend = {email, name, password};
    const res = await getAdmin.post('/api/register', dataSend);
    store.dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors)
    }
    store.dispatch({
      type: REGISTER_FAIL
    }
    );
    store.dispatch({
      type: SET_ALERT,
      payload: 'Password needs to be more than 6 character'
    })
  }
};

export const LoginController  = async formData  => {
  const body = formData;
  try {
    const res = await getAdmin.post('/api/login', body);
    console.log(res)
     store.dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    loadAdmin();
  } catch (err) {
    throw err;
    store.dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const LogoutController = () => {
  store.dispatch({
    type: LOGOUT
  })
};