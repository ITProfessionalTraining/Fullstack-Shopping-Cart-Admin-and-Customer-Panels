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


export const loadAdmin  = () => async (dispatch)   => {
  try {

    const res = await getAdmin.get('/access');    
    if(res.data.error){
      dispatch({
        type: AUTH_ERROR
      });

    }else{
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }

   
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

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

export const LoginController  = ({email, password}) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await getAdmin.post('/login', body);
     dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadAdmin());
  } catch (err) {
    throw err;

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const LogoutController = () => ({ type: LOGOUT });