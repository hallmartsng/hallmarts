import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }

      state.totalItems += 1;
      state.subtotal += action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.productId === action.payload);

      if (!item) return;

      state.totalItems -= item.quantity;
      state.subtotal -= item.price * item.quantity;

      state.items = state.items.filter((i) => i.productId !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
