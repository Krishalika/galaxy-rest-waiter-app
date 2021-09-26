export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //return cart state which already there
      //action includes payload
      //payload contains the data we want to contain in the state and manipulate state
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      //Filter the items inside the cart already with id of those
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    default:
      return state;
  }
};
