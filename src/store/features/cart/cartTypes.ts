import type { CartItem, MenuItem } from "../../../types";

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
}

export interface AddItemPayload {
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
}

export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

export interface UpdateItemPayload {
  id: string;
  updates: Partial<CartItem>;
}
