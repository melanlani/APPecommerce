import axios from 'axios';
import {baseUrl} from './api';

export const getProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${baseUrl}/api/v1/products`)
  }
}
