export const ADD_ITEM = "ADD_ITEM";
export const RESET_CART = "RESET_CART";

export function addToCart(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

export function resetCart() {
  return {
    type: RESET_CART,
  };
}
