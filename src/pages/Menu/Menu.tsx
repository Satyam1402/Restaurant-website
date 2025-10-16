import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { categories, menuItems, getMenuItemsByCategory } from '../../data/menuData';
import MenuGrid from '../../components/features/menu/MenuGrid/MenuGrid';
import CategoryFilter from '../../components/features/menu/CategoryFilter/CategoryFilter';
import SearchBar from '../../components/features/menu/SearchBar/SearchBar';
import MenuItemModal from '../../components/features/menu/MenuItemModal/MenuItemModal';
import type { MenuItem } from '../../types';

const Menu: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Filter by category
    if (selectedCategory) {
      items = getMenuItemsByCategory(selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return items.filter(item => item.isAvailable);
  }, [selectedCategory, searchTerm]);

  // Calculate item counts per category
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat.id] = getMenuItemsByCategory(cat.id).filter(item => item.isAvailable).length;
    });
    return counts;
  }, []);

  const handleViewDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getEmptyStateMessage = () => {
    if (searchTerm && selectedCategory) {
      return `No items found matching "${searchTerm}" in ${categories.find(c => c.id === selectedCategory)?.name || 'this category'}.`;
    } else if (searchTerm) {
      return `No items found matching "${searchTerm}". Try a different search term.`;
    } else if (selectedCategory) {
      return `No items available in ${categories.find(c => c.id === selectedCategory)?.name || 'this category'} right now.`;
    }
    return "No menu items available at the moment.";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover our carefully crafted dishes made with the finest ingredients
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Content Container - FIXED WITH PROPER SPACING */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 max-w-7xl">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search for dishes, ingredients, or cuisine..."
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            itemCounts={itemCounts}
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {searchTerm && (
              <span>
                Showing {filteredItems.length} results for "<strong>{searchTerm}</strong>"
                {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </span>
            )}
            {!searchTerm && selectedCategory && (
              <span>
                Showing {filteredItems.length} items in {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
            {!searchTerm && !selectedCategory && (
              <span>Showing all {filteredItems.length} available items</span>
            )}
          </div>
        </div>

        {/* Menu Grid - No additional padding needed here */}
        <MenuGrid
          items={filteredItems}
          onViewDetails={handleViewDetails}
          loading={loading}
          emptyStateMessage={getEmptyStateMessage()}
        />
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Menu;
