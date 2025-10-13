import React from 'react';
import type { Category } from '../../../../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  itemCounts?: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  itemCounts = {}
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
      {/* All Items Button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
          selectedCategory === null
            ? 'bg-primary-500 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50'
        }`}
      >
        All Items
        <span className="ml-2 text-sm opacity-75">
          ({Object.values(itemCounts).reduce((sum, count) => sum + count, 0) || categories.reduce((sum, cat) => sum + cat.itemCount, 0)})
        </span>
      </button>

      {/* Category Buttons */}
      {categories
        .filter(category => category.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex items-center space-x-2 ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            <span>{category.name}</span>
            <span className="text-sm opacity-75">
              ({itemCounts[category.id] || category.itemCount})
            </span>
          </button>
        ))
      }
    </div>
  );
};

export default CategoryFilter;
