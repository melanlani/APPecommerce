const initialState = {
  products: [],
  productId: '',
  productImage: '',
  productName: '',
  productPrice: '',
  description: '',
  quantity: 1
}


export default products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_FULFILLED':
      return {
        products: action.payload.data.data
      };
    case 'GET_PRODUCT_REJECTED':
      return {
        products: action.payload.data
      };
    case 'GET_DETAIL_FULFILLED':
      return {
        productId: action.payload.data.data.id,
        productImage: action.payload.data.data.imageHolder,
        productName: action.payload.data.data.nameProduct,
        productPrice: action.payload.data.data.priceHolder,
        description: action.payload.data.data.description,
        quantity: 1
      };
    case 'GET_DETAIL_REJECTED':
      return {
        products: action.payload.data
      };
    default:
      return state;
  }
}
