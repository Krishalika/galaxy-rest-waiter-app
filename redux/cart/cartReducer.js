import * as actionTypes from "./cartActions";

const initialState = {
  items: [],
};

// state and action -> new state
function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_CART:
      return { ...state, items: [] };
    case actionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
}

export default reducer;
