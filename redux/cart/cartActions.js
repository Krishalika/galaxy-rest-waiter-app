export const ADD_ITEM = "ADD_ITEM";
export const RESET_CART = "RESET_CART";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

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

export function removeCartItem(item) {
  return {
    type: REMOVE_CART_ITEM,
    item,
  };
}
