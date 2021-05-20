import { Dispatch } from 'react';
import {getAdmin} from '../util/getAdmin'
import {
  GET_PROFILE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT
} from './type';


export const loadAdmin  = () => async (dispatch)   => {
  try {

    const res = await api.get('/access');    
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

export const Register = async ({firstname, lastname, email, password})=>{
 
  const formData =  {firstname, lastname, email, password};  
  try {
    const res = await api.post('/register', formData);
    if(res.status === 200){
      alert("Successfully Registered");
      window.location.href = '/';
    }
    else{
      window.location.href = "/register"
    }
    if(res.error){
      console.log("true")
    }
    
  } catch (error) {
    throw error;        
  }
};


export const LoginController  = ({email, password}) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/login', body);
     dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    throw err;

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const LogoutController = () => ({ type: LOGOUT });