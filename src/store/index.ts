import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authReducer from './features/auth/authSlice';
import adminReducer from './features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cart/addItem', 'cart/loadCart'],
        ignoredActionsPaths: ['payload.addedAt'],
        ignoredPaths: ['cart.items.0.addedAt'],
      },
    }),
  devTools: true, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
