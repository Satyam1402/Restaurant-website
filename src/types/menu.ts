export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?: MenuCategory;
  image?: string;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  spicyLevel?: 1 | 2 | 3; // Mild, Medium, Hot
  preparationTime: number; // in minutes
  isAvailable: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image?: File | string;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  spicyLevel: 1 | 2 | 3;
  preparationTime: number;
  isAvailable: boolean;
  isPopular: boolean;
  isFeatured: boolean;
}

export interface MenuFilters {
  categoryId?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isAvailable?: boolean;
  search?: string;
  sortBy: 'name' | 'price' | 'popularity' | 'created';
  sortOrder: 'asc' | 'desc';
}

export interface MenuStats {
  totalItems: number;
  totalCategories: number;
  averagePrice: number;
  popularItems: MenuItem[];
  unavailableItems: number;
}
