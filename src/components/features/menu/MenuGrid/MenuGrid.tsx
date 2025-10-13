import React from 'react';
import type { MenuItem } from '../../../../types';
import MenuCard from '../MenuCard/MenuCard';

interface MenuGridProps {
  items: MenuItem[];
  onViewDetails?: (item: MenuItem) => void;
  loading?: boolean;
  emptyStateMessage?: string;
}

const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  onViewDetails,
  loading = false,
  emptyStateMessage = "No menu items found."
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Items Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuCard 
          key={item.id} 
          item={item} 
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
