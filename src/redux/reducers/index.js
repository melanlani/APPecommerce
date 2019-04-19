import { combineReducers } from 'redux';

import products from './products';
import products_detail from './products_detail';
import orders from './orders';
// import messages from './messages';

const reducers = combineReducers({
  products,
  products_detail,
  orders
  // messages
})

export default reducers;
