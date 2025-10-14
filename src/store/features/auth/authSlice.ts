// src/store/features/auth/authSlice.ts
import { createSlice, type PayloadAction, } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: DeliveryAddress[];
  preferences: {
    dietaryRestrictions: string[];
    favoriteItems: string[];
  };
  createdAt: Date;
}

interface DeliveryAddress {
  id: string;
  label: string; // 'Home', 'Work', 'Other'
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  instructions?: string;
  isDefault: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear localStorage
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-data');
    },
    
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Save to localStorage
        localStorage.setItem('user-data', JSON.stringify(state.user));
      }
    },
    
    addAddress: (state, action: PayloadAction<DeliveryAddress>) => {
      if (state.user) {
        // If this is the first address or marked as default, make it default
        if (state.user.addresses.length === 0 || action.payload.isDefault) {
          state.user.addresses.forEach(addr => addr.isDefault = false);
        }
        state.user.addresses.push(action.payload);
        localStorage.setItem('user-data', JSON.stringify(state.user));
      }
    },
    
    updateAddress: (state, action: PayloadAction<DeliveryAddress>) => {
      if (state.user) {
        const index = state.user.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          // If setting as default, remove default from others
          if (action.payload.isDefault) {
            state.user.addresses.forEach(addr => addr.isDefault = false);
          }
          state.user.addresses[index] = action.payload;
          localStorage.setItem('user-data', JSON.stringify(state.user));
        }
      }
    },
    
    removeAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.filter(addr => addr.id !== action.payload);
        // If removed default address, make first remaining address default
        if (!state.user.addresses.some(addr => addr.isDefault) && state.user.addresses.length > 0) {
          state.user.addresses[0].isDefault = true;
        }
        localStorage.setItem('user-data', JSON.stringify(state.user));
      }
    },
    
    addFavoriteItem: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.preferences.favoriteItems.includes(action.payload)) {
        state.user.preferences.favoriteItems.push(action.payload);
        localStorage.setItem('user-data', JSON.stringify(state.user));
      }
    },
    
    removeFavoriteItem: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.preferences.favoriteItems = state.user.preferences.favoriteItems.filter(
          id => id !== action.payload
        );
        localStorage.setItem('user-data', JSON.stringify(state.user));
      }
    },
    
    loadUserFromStorage: (state) => {
      try {
        const userData = localStorage.getItem('user-data');
        const authToken = localStorage.getItem('auth-token');
        
        if (userData && authToken) {
          const user = JSON.parse(userData);
          state.user = {
            ...user,
            createdAt: new Date(user.createdAt)
          };
          state.isAuthenticated = true;
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  logout,
  updateProfile,
  addAddress,
  updateAddress,
  removeAddress,
  addFavoriteItem,
  removeFavoriteItem,
  loadUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
