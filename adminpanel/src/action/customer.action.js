import {GET_CUSTOMERS} from './types'
import store from '../store'
import {getCustomers} from '../util/getCustomers'

export const GET_ALL_CUSTOMERS = async () =>{
    try {
        let data = await getCustomers.get('/customer')
        store.dispatch({
            type: GET_CUSTOMERS,
            payload: data.data.data
          });
        
    } catch (error) {
      console.log(error);
    }
}
