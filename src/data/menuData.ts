import type { MenuItem, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Start your meal with these delicious appetizers',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
    isActive: true,
    displayOrder: 1,
    slug: 'appetizers'
  },
  {
    id: 'mains',
    name: 'Main Courses',
    description: 'Hearty and satisfying main dishes',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
    isActive: true,
    displayOrder: 2,
    slug: 'mains'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet endings to your perfect meal',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
    isActive: true,
    displayOrder: 3,
    slug: 'desserts'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Refreshing drinks and specialty coffees',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    itemCount: 10,
    isActive: true,
    displayOrder: 4,
    slug: 'beverages'
  }
];

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-001',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls stuffed with mozzarella and truffle oil, served with marinara sauce',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1572441713132-51436dcfdb22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers',
    dietary: ['vegetarian'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: 12,
    ingredients: ['Arborio rice', 'Mozzarella', 'Truffle oil', 'Parmesan', 'Breadcrumbs'],
    calories: 320,
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: 'app-002',
    name: 'Korean BBQ Wings',
    description: 'Crispy chicken wings glazed with gochujang sauce, sesame seeds, and scallions',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers',
    dietary: [],
    spiceLevel: 3,
    isAvailable: true,
    preparationTime: 15,
    ingredients: ['Chicken wings', 'Gochujang', 'Soy sauce', 'Sesame oil', 'Green onions'],
    calories: 420,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: 'app-003',
    name: 'Burrata Caprese',
    description: 'Fresh burrata cheese with heirloom tomatoes, basil, and aged balsamic reduction',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'appetizers',
    dietary: ['vegetarian', 'gluten-free'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: 8,
    ingredients: ['Burrata cheese', 'Heirloom tomatoes', 'Fresh basil', 'Balsamic vinegar', 'Extra virgin olive oil'],
    calories: 280,
    rating: 4.9,
    reviewCount: 89
  },

  // Main Courses
  {
    id: 'main-001',
    name: 'Wagyu Ribeye Steak',
    description: '12oz premium wagyu ribeye with roasted garlic mashed potatoes and seasonal vegetables',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'mains',
    dietary: ['gluten-free'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: 25,
    ingredients: ['Wagyu ribeye', 'Yukon potatoes', 'Roasted garlic', 'Seasonal vegetables', 'Herb butter'],
    calories: 820,
    rating: 4.9,
    reviewCount: 312
  },
  {
    id: 'main-002',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with quinoa pilaf, roasted asparagus, and lemon herb sauce',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'mains',
    dietary: ['gluten-free', 'dairy-free'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: 18,
    ingredients: ['Atlantic salmon', 'Quinoa', 'Asparagus', 'Lemon', 'Fresh herbs'],
    calories: 520,
    rating: 4.6,
    reviewCount: 178
  },
  {
    id: 'main-003',
    name: 'Mushroom Risotto',
    description: 'Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'mains',
    dietary: ['vegetarian', 'gluten-free'],
    spiceLevel: 1,
    isAvailable: true,
    preparationTime: 22,
    ingredients: ['Arborio rice', 'Wild mushrooms', 'Parmesan', 'White wine', 'Truffle oil'],
    calories: 480,
    rating: 4.7,
    reviewCount: 145
  },

  // Desserts
  {
    id: 'dess-001',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, vanilla ice cream, and berry compote',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
    dietary: ['vegetarian'],
    isAvailable: true,
    preparationTime: 14,
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Vanilla ice cream'],
    calories: 420,
    rating: 4.8,
    reviewCount: 267
  },
  {
    id: 'dess-002',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
    dietary: ['vegetarian'],
    isAvailable: true,
    preparationTime: 5,
    ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa powder', 'Eggs'],
    calories: 380,
    rating: 4.6,
    reviewCount: 198
  },

  // Beverages
  {
    id: 'bev-001',
    name: 'Craft Cold Brew',
    description: 'House-made cold brew coffee with optional vanilla or caramel syrup',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'beverages',
    dietary: ['vegan', 'gluten-free'],
    isAvailable: true,
    preparationTime: 3,
    ingredients: ['Cold brew concentrate', 'Filtered water', 'Optional syrups'],
    calories: 5,
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: 'bev-002',
    name: 'Fresh Fruit Smoothie',
    description: 'Blend of seasonal fruits with coconut milk and honey',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'beverages',
    dietary: ['vegetarian', 'gluten-free'],
    isAvailable: true,
    preparationTime: 4,
    ingredients: ['Seasonal fruits', 'Coconut milk', 'Honey', 'Ice'],
    calories: 180,
    rating: 4.4,
    reviewCount: 112
  }
];

// Helper functions
export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getAvailableMenuItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isAvailable);
};

export const searchMenuItems = (searchTerm: string): MenuItem[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return menuItems.filter(item => 
    item.name.toLowerCase().includes(lowercaseSearch) ||
    item.description.toLowerCase().includes(lowercaseSearch) ||
    item.ingredients?.some(ingredient => 
      ingredient.toLowerCase().includes(lowercaseSearch)
    )
  );
};

export const filterMenuItemsByDietary = (dietaryRequirements: string[]): MenuItem[] => {
  if (dietaryRequirements.length === 0) return menuItems;
  
  return menuItems.filter(item =>
    dietaryRequirements.every(requirement =>
      item.dietary.includes(requirement as any)
    )
  );
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};
