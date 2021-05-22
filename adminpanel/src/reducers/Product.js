import {GET_PRODUCTS, GET_TRENDING_PRODUCT} from '../action/types'

const initialState = {
    products: null,
    trendingProducts : null
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
               products : [...payload]
            };

        case GET_TRENDING_PRODUCT :
          return{
              ...state,
              ...payload
          };
            default:
          return state;

    }
}