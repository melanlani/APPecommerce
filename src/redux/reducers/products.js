const initialState = {
  products: [],
  pending: false
}

export default products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING':
      return {
        products: [],
        pending: true
      };
    case 'GET_PRODUCT_FULFILLED':
      return {
        products: action.payload.data.data,
        pending: false,
      };
    case 'GET_PRODUCT_REJECTED':
      return {
        error: action.payload.data,
        pending: false,
      };

    default:
      return state;
  }
}
