import {
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_ALERT
  } from '../action/types';

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };


  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
          return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
          };
        case REGISTER_SUCCESS:
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
        case LOGIN_SUCCESS:
          return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
          };
        case AUTH_ERROR:
          return {
            ...state,
            ...payload,
            isAuthenticated: false,
            loading: false
          };

          case SET_ALERT :
            return {
              payload
            };

        case LOGOUT:
          return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
          };
        default:
          return state;
      }
    }