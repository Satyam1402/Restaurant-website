export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free')[];
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  ingredients?: string[];
  calories?: number;
  rating?: number;
  reviewCount?: number;
}

// Cart Item Interface
export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
  totalPrice: number;
  addedAt: Date;
}

// User Related Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
  preferences?: UserPreferences;
  createdAt: Date;
  isVerified: boolean;
}

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
  label?: string; 
}

export interface UserPreferences {
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free')[];
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  favoriteCategories: string[];
}

// Order Related Interfaces
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
  trackingSteps: OrderTrackingStep[];
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface OrderTrackingStep {
  status: OrderStatus;
  timestamp: Date;
  description: string;
  location?: string;
}

// Payment Related Interfaces
export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'debit-card' | 'paypal' | 'cash' | 'digital-wallet';
  provider?: string; // 'visa', 'mastercard', 'paypal', etc.
  lastFourDigits?: string;
  isDefault: boolean;
}

// Category Interface
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  isActive: boolean;
  displayOrder: number;
  slug: string;
}

// Restaurant Related Interfaces
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  reviewCount: number;
  openingHours: OpeningHours;
  deliveryRadius: number; // in kilometers
  minimumOrderAmount: number;
  deliveryFee: number;
  estimatedDeliveryTime: number; // in minutes
  isOpen: boolean;
  tags: string[];
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "22:00"
  isAllDay?: boolean;
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Form Related Interfaces
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Search and Filter Interfaces
export interface MenuFilter {
  categories?: string[];
  dietary?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  spiceLevel?: number[];
  rating?: number;
  isAvailable?: boolean;
  searchTerm?: string;
}

export interface SortOption {
  field: 'name' | 'price' | 'rating' | 'preparationTime' | 'popularity';
  direction: 'asc' | 'desc';
}

// Notification Interface
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Theme and UI Interfaces
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  fontFamily: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type NonEmptyArray<T> = [T, ...T[]];

// Constants
export const DIETARY_OPTIONS = [
  'vegetarian',
  'vegan', 
  'gluten-free',
  'dairy-free',
  'nut-free'
] as const;

export const SPICE_LEVELS = [1, 2, 3, 4, 5] as const;

export const ORDER_STATUSES = [
  'pending',
  'confirmed', 
  'preparing',
  'ready',
  'out-for-delivery',
  'delivered',
  'cancelled',
  'refunded'
] as const;
