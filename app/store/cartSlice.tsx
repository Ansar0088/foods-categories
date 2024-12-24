import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SaleItem } from "../types";

interface CartItem extends SaleItem {
  quantity: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<SaleItem>) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
            ...action.payload,
            quantity: 1,
            total: action.payload.price,
        });
      }
      state.total = state.items.reduce((sum, item) => sum + item.total, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + item.total, 0);
    },
    updateQuantity: (
        state,
        action: PayloadAction<{ name: string; quantity: number }>
      ) => {
        const { name, quantity } = action.payload;
        const itemIndex = state.items.findIndex((item) => item.name === name);
     
        if (itemIndex !== -1) {
          const item = state.items[itemIndex];
          item.quantity = Math.max(0, quantity);
          item.total = item.price * item.quantity;
          if (item.quantity === 0) {
            state.items.splice(itemIndex, 1); 
          }
        }
     
        state.total = state.items.reduce((sum, item) => sum + item.total, 0);
      },
     
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
