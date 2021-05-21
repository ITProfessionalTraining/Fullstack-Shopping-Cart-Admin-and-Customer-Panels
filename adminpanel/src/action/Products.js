import {GET_PRODUCTS, GET_TRENDING_PRODUCT} from './types'
import store from '../store'
import {getProducts} from '../util/getProduct'


export const ALL_PRODUCTS = async () =>{
    try {
        let data = await getProducts.get('/api/v1');
        store.dispatch({
            type: GET_PRODUCTS,
            payload: data.data
          });
        
    } catch (error) {

      console.log(error);
    }
}


export const TRENDING_PRODUCTS = async ()=>{
  try {
    let data = await getProducts.get('/api/trending');
    store.dispatch({
      type: GET_TRENDING_PRODUCT,
      payload: data.data
    })
  } catch (error) {
    console.log('error')
    
  }
}