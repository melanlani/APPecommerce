const initialState = {
  itemCart: [],
  pending: false,
  error: "",
  total: 0
}

export default orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_PENDING':
      return {
        ...state,
        itemCart: [],
        pending: true
      };
    case 'ADD_CART_FULFILLED':

      return {
        ...state,
        pending: false,
        total: action.payload.data.total
      };
    case 'ADD_CART_REJECTED':
      return {
        ...state,
        pending: false,
        error: action.payload.data
      };

    case 'GET_CART_PENDING':
      return {
        ...state,
        itemCart: [],
        pending: true
      };
    case 'GET_CART_FULFILLED':
      return {
        ...state,
        itemCart: [...state.itemCart, ...action.payload.data.data],
        pending: false,
        total: action.payload.data.total
      };
    case 'GET_CART_REJECTED':
      return {
        ...state,
        pending: false,
        error: action.payload.data
      };

      case 'DELETE_ITEM_PENDING':
        return {
          ...state,
          itemCart: [],
          pending: true
        };
      case 'DELETE_ITEM_FULFILLED':

        return {
          ...state,
          itemCart: state.itemCart.filter(cartItem=> cartItem.orderId !== action.payload.data.data.orderId),
          pending: false,
          total: action.payload.data.total
        }

      case 'PLUS_QTY_PENDING':
        return {
          ...state,
          itemCart: [],
          pending: true
        };

      case 'PLUS_QTY_FULFILLED':

        return {
          ...state,
          itemCart: state.itemCart.map(cartItem => {
                      if (cartItem.orderId === action.payload.data.data.orderId){
                          return action.payload.data.data
                      } else {
                          return cartItem
                      }
                    }),
          pending: false,
          total: action.payload.data.total
        }

        case 'MIN_QTY_PENDING':
          return {
            ...state,
            itemCart: [],
            pending: true
          };

        case 'MIN_QTY_FULFILLED':

        return {
          ...state,
          itemCart: state.itemCart.map(cartItem => {
                      if (cartItem.orderId === action.payload.data.data.orderId){
                          return action.payload.data.data
                      } else {
                          return cartItem
                      }
                    }),
          pending: false,
          total: action.payload.data.total
          }

    default:
      return state;
  }
}
