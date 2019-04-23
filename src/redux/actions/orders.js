import axios from 'axios';
import { baseUrl } from './api';

export const addItemCart = ( productId, productPrice ) => {
  return {
    type: 'ADD_CART',
    payload: axios.post(`${baseUrl}/api/v1/order`, {
            'product_id': productId,
            'qty': 1,
            'price': productPrice,
            'subtotal': productPrice
    })
  }
}

export const getCart = () => {
    return{
      type: 'GET_CART',
      payload: axios.get(`${baseUrl}/api/v1/orders`)
    }
}

export const deleteItem = (orderId) => {
    return{
      type: 'DELETE_ITEM',
      payload: axios.delete(`${baseUrl}/api/v1/order/${orderId}`)
    }
}

export const handlePlus = (orderId, qty, price) => {

    return {
      type: 'PLUS_QTY',
      payload: axios.patch(`${baseUrl}/api/v1/order/${orderId}`, {
          qty: qty,
          price: price
      })
    }
}

export const handleMin = (orderId, qty, price) => {

    return {
      type: 'MIN_QTY',
      payload: axios.patch(`${baseUrl}/api/v1/order/${orderId}`, {
          qty: qty,
          price: price
      })
    }
}

export const addCart = (data) => {

    return {
      type: 'ADD_TO_CART',
      payload: data
      }
    }
