import { useReducer } from "react";
import { CartContext } from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const updatedTotalAmount = (amount) => state.totalAmount + amount;

  switch (action.type) {
    case "ADD_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItem;
      let updatedItems;

      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItem = { ...action.item };
        updatedItems = state.items.concat(updatedItem);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount(action.item.price * action.item.amount),
      };
    }

    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      if (!existingCartItem) return state;

      const updatedTotalAmount = state.totalAmount - existingCartItem.price;

      const updatedItems =
        existingCartItem.amount === 1
          ? state.items.filter((item) => item.id !== action.id)
          : state.items.map((item, index) =>
              index === existingCartItemIndex
                ? { ...existingCartItem, amount: existingCartItem.amount - 1 }
                : item
            );

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case "CLEAR_CART":
      return defaultCartState;

    default:
      return state;
  }
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) =>
    dispatchCartAction({ type: "ADD_ITEM", item });
  const removeItemHandler = (id) =>
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  const clearCartHandler = () => dispatchCartAction({ type: "CLEAR_CART" });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
