const initialState = {
  itemCart: [],
  pending: false
}

export default orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART_PENDING':
      return {
        itemCart: [],
        pending: true
      };
    case 'ADD_CART_FULFILLED':

      return {
        itemCart: action.payload.data.data,
        pending: false,
      };
    case 'ADD_CART_REJECTED':
      return {
        itemCart: action.payload.data,
        pending: false,
      };

    case 'GET_CART_PENDING':
      return {
        itemCart: [],
        pending: true
      };
    case 'GET_CART_FULFILLED':
      return {
        itemCart: action.payload.data.data,
        pending: false,
      };
    case 'GET_CART_REJECTED':
      return {
        itemCart: action.payload.data,
        pending: false,
      };

      case 'DELETE_ITEM_PENDING':
        return {
          itemCart: [],
          pending: true
        };
      case 'DELETE_ITEM_FULFILLED':
      for (var i = 0; i < state.itemCart.length; i++) {
      	if (state.itemCart[i].product_id == action.payload.data.data.product_id ) {
      		state.itemCart.splice(i, 1);
      	}
      }

        return {
          ...state,
          itemCart: action.payload.data.data,
          pending: false,
        }

      case 'PLUS_QTY_FULFILLED':
      const plusQtyItem = state.itemCart.map((val) => {
            if (val.id === action.payload.data.data.id){
                return action.payload.data.data
            } else {
                return val
            }
        })

        return {
            itemCart: plusQtyItem
        }
        case 'MIN_QTY_FULFILLED':
        const minQtyItem = state.itemCart.map((val) => {
              if (val.id === action.payload.data.data.id){
                  return action.payload.data.data
              } else {
                  return val
              }
          })

          return {
              itemCart: minQtyItem
          }

    default:
      return state;
  }
}
