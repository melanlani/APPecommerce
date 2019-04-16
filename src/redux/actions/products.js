import axios from 'axios';

export const getProduct = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://192.168.43.192:3333/api/v1/products')
  }
}

export const getDetail = (id) => {
  return {
    type: 'GET_DETAIL',
    payload: axios.get(`http://192.168.43.192:3333/api/v1/products/${id}`)
  }
}
