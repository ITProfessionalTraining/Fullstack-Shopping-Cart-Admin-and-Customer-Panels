import { combineReducers } from 'redux';
import auth from './auth'
import product from './Product'

export default combineReducers({
  auth,
  product
});