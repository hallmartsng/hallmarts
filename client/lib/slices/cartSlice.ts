import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCartLocalStorageItem,
  setCartLocalStorageItem,
} from "../localStorage";
import { CartItemType, CartStateType } from "@/types/cart.types";

const calculateSubtotal = (items: CartItemType[]): number =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const initialState: CartStateType = getCartLocalStorageItem() || {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      try {
        const existingItem = state.items.find(
          (item) => item.productId === action.payload.productId,
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      } catch (error) {
        alert(error);
      }
      state.totalItems += 1;
      state.subtotal = calculateSubtotal(state.items);
      setCartLocalStorageItem(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (i) => i.productId === action.payload,
      );

      if (existingItem) {
        if (existingItem?.quantity === 1) {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload,
          );
        } else {
          existingItem.quantity -= 1;
        }
      }

      state.totalItems -= 1;
      state.subtotal = calculateSubtotal(state.items);

      setCartLocalStorageItem(state);
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (i) => i.productId === action.payload,
      );

      if (existingItem) {
        state.items = state.items.filter((i) => i.productId !== action.payload);

        state.totalItems -= existingItem.quantity;
      }

      state.subtotal = calculateSubtotal(state.items);

      setCartLocalStorageItem(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      setCartLocalStorageItem(state);
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
