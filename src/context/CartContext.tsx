import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, MenuItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; quantity: number; customizations?: string[] } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (menuItem: MenuItem, quantity?: number, customizations?: string[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getItemById: (id: string) => CartItem | undefined;
  hasItem: (menuItemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOAD_CART':
      const loadedItems = action.payload;
      return {
        ...state,
        items: loadedItems,
        total: loadedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: loadedItems.reduce((sum, item) => sum + item.quantity, 0),
        isLoading: false,
      };

    case 'ADD_ITEM': {
      const { menuItem, quantity, customizations = [] } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );
      
      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { 
                ...item, 
                quantity: item.quantity + quantity, 
                totalPrice: (item.quantity + quantity) * menuItem.price,
                addedAt: new Date()
              }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      
      // Add new item
      const newItem: CartItem = {
        id: `${menuItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        menuItem,
        quantity,
        customizations,
        totalPrice: quantity * menuItem.price,
        addedAt: new Date(),
      };
      
      const newItems = [...state.items, newItem];
      
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.menuItem.price }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case 'UPDATE_ITEM': {
      const { id, updates } = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isLoading: false,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem('restaurant-cart');
        if (savedCart) {
          const parsedCart: CartItem[] = JSON.parse(savedCart);
          // Convert date strings back to Date objects
          const processedCart = parsedCart.map(item => ({
            ...item,
            addedAt: new Date(item.addedAt),
          }));
          dispatch({ type: 'LOAD_CART', payload: processedCart });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      try {
        localStorage.setItem('restaurant-cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, state.isLoading]);

  const addItem = (menuItem: MenuItem, quantity: number = 1, customizations: string[] = []) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, quantity, customizations } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.itemCount;
  };

  const getItemById = (id: string) => {
    return state.items.find(item => item.id === id);
  };

  const hasItem = (menuItemId: string) => {
    return state.items.some(item => item.menuItem.id === menuItemId);
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      updateItem,
      clearCart,
      getTotalItems,
      getItemById,
      hasItem,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
