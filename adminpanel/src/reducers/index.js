import { combineReducers } from 'redux';
import auth from './auth'
import product from './Product'
import customer from './customer'

export default combineReducers({
  auth,
  product, 
  customer
});