import React from 'react';
import { Star, Clock, Plus, Leaf, Flame } from 'lucide-react';
import type { MenuItem } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import Button from '../../../ui/Button/Button';
import { addItem } from '../../../../store/features/cart/cartSlice';

interface MenuCardProps {
  item: MenuItem;
  onViewDetails?: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onViewDetails }) => {
  const dispatch = useAppDispatch(); 
  
  // 🔥 Check if item exists in cart using Redux selector
  const hasItemInCart = useAppSelector(state => 
    state.cart.items.some(cartItem => cartItem.menuItem.id === item.id)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 🔥 Dispatch Redux action to add item
    dispatch(addItem({ 
      menuItem: item, 
      quantity: 1,
      customizations: [] // Default empty customizations
    }));
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(item);
    }
  };

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian':
      case 'vegan':
        return <Leaf size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getSpiceLevelColor = (level?: number) => {
    if (!level) return '';
    if (level <= 2) return 'text-green-500';
    if (level <= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div 
      className="w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Availability Badge */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Dietary Icons */}
        {item.dietary.length > 0 && (
          <div className="absolute top-3 left-3 flex space-x-1">
            {item.dietary.slice(0, 2).map((dietary) => (
              <div key={dietary} className="bg-white bg-opacity-90 rounded-full p-1.5">
                {getDietaryIcon(dietary)}
              </div>
            ))}
          </div>
        )}

        {/* Rating Badge */}
        {item.rating && (
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{item.rating}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
            {item.name}
          </h3>
          <div className="text-xl font-bold text-primary-600 ml-2">
            ${item.price}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Preparation Time */}
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{item.preparationTime} min</span>
            </div>
            
            {/* Spice Level */}
            {item.spiceLevel && (
              <div className="flex items-center space-x-1">
                <Flame size={14} className={getSpiceLevelColor(item.spiceLevel)} />
                <span className={getSpiceLevelColor(item.spiceLevel)}>
                  {'🌶️'.repeat(item.spiceLevel)}
                </span>
              </div>
            )}
          </div>

          {/* Calories */}
          {item.calories && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {item.calories} cal
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!item.isAvailable}
          className="w-full group-hover:bg-primary-600 transition-colors"
          size="sm"
        >
          <Plus size={16} className="mr-2" />
          {hasItemInCart ? 'Add More' : 'Add to Cart'}
        </Button>

        {/* Review Count */}
        {item.reviewCount && (
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-400">
              {item.reviewCount} reviews
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
