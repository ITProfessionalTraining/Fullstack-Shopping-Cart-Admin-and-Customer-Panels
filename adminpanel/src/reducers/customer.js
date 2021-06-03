import {
    GET_CUSTOMERS
  } from '../action/types';


  const initialState = {
    customers: null
  };

 
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                 customers: [...payload]
            };
            default:
          return state;

    }
}