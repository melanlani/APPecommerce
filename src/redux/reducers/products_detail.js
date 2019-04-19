const initialState = {
  productId: '',
  productImage: '',
  productName: '',
  productPrice: '',
  description: '',
  quantity: 1,
  pending: false
}

export default products_detail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DETAIL_PENDING':
      return {
        productId: '',
        productImage: '',
        productName: '',
        productPrice: '',
        description: '',
        pending: true
      };
    case 'GET_DETAIL_FULFILLED':
      return {
        productId: action.payload.data.data.id,
        productImage: action.payload.data.data.imageHolder,
        productName: action.payload.data.data.nameProduct,
        productPrice: action.payload.data.data.priceHolder,
        description: action.payload.data.data.description,
        quantity: 1,
        pending: false,
      };
    case 'GET_DETAIL_REJECTED':
      return {
        error: action.payload.data,
        pending: false,
      };
    default:
      return state;
  }
}
