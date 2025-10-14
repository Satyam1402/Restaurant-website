
import type { CartItem } from '../../types';
import { loadCart } from '../features/cart/cartSlice';
import type { AppDispatch } from '../index';

export const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('restaurant-cart', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const loadCartFromStorage = (dispatch: AppDispatch) => {
  try {
    const savedCart = localStorage.getItem('restaurant-cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      const processedCart = parsedCart.map(item => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }));
      dispatch(loadCart(processedCart));
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
};
