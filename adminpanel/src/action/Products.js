import {GET_PRODUCTS} from './types'
import store from '../store'
import {getProducts} from '../util/getProduct'


export const allProducts = async () =>{

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