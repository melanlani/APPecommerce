import axios from 'axios';
import {baseUrl} from './api';

export const getDetail = (id) => {
  return {
    type: 'GET_DETAIL',
    payload: axios.get(`${baseUrl}/api/v1/products/${id}`)
  }
}
