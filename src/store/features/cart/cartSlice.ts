import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddItemPayload, CartState, UpdateItemPayload, UpdateQuantityPayload } from './cartTypes';
import type { CartItem } from '../../../types';


// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
};

// Helper function to recalculate totals
const recalculateTotals = (state: CartState) => {
  state.total = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
};

// Helper function to generate unique item ID
const generateItemId = (menuItemId: string): string => {
  return `${menuItemId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Load cart from localStorage
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      recalculateTotals(state);
    },

    // Add item to cart
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { menuItem, quantity, customizations = [] } = action.payload;
      
      // Check if item with same customizations already exists
      const existingItemIndex = state.items.findIndex(
        item => 
          item.menuItem.id === menuItem.id && 
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * menuItem.price;
        existingItem.addedAt = new Date();
      } else {
        // Add new item
        const newItem: CartItem = {
          id: generateItemId(menuItem.id),
          menuItem,
          quantity,
          customizations,
          totalPrice: quantity * menuItem.price,
          addedAt: new Date(),
        };
        state.items.push(newItem);
      }

      recalculateTotals(state);
    },

    // Remove item from cart
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      recalculateTotals(state);
    },

    // Update item quantity
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = quantity * item.menuItem.price;
        recalculateTotals(state);
      }
    },

    // Update item details
    updateItem: (state, action: PayloadAction<UpdateItemPayload>) => {
      const { id, updates } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        state.items[itemIndex] = { ...state.items[itemIndex], ...updates };
        recalculateTotals(state);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

// Export actions
export const {
  setLoading,
  loadCart,
  addItem,
  removeItem,
  updateQuantity,
  updateItem,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Export selectors (these help components get specific data)
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.itemCount;
export const selectCartLoading = (state: { cart: CartState }) => state.cart.isLoading;
export const selectItemById = (state: { cart: CartState }, id: string) => 
  state.cart.items.find(item => item.id === id);
export const selectHasItem = (state: { cart: CartState }, menuItemId: string) => 
  state.cart.items.some(item => item.menuItem.id === menuItemId);
