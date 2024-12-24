import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import walkingReducer from'./orderSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    walking: walkingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;