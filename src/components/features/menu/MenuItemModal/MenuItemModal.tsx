import React, { useState } from 'react';
import { Star, Clock, Flame, Leaf, Plus, Minus, ShoppingCart } from 'lucide-react';
import type { MenuItem } from '../../../../types';
import { useAppDispatch } from '../../../../hooks/redux'; 
import Modal from '../../../ui/Modal/Modal';
import Button from '../../../ui/Button/Button';
import { addItem } from '../../../../store/features/cart/cartSlice';

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleCustomizationToggle = (customization: string) => {
    setSelectedCustomizations(prev => 
      prev.includes(customization)
        ? prev.filter(c => c !== customization)
        : [...prev, customization]
    );
  };

  const handleAddToCart = () => {
    // 🔥 Dispatch Redux action with all the details
    dispatch(addItem({ 
      menuItem: item, 
      quantity,
      customizations: selectedCustomizations
    }));
    
    onClose();
    
    // Reset form
    setQuantity(1);
    setSelectedCustomizations([]);
    setSpecialInstructions('');
  };

  const totalPrice = item.price * quantity;

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

  // Sample customization options (in real app, this would come from the item data)
  const customizationOptions = [
    { id: 'extra-cheese', name: 'Extra Cheese', price: 2.00 },
    { id: 'no-onions', name: 'No Onions', price: 0 },
    { id: 'extra-sauce', name: 'Extra Sauce', price: 1.50 },
    { id: 'gluten-free', name: 'Gluten-Free Option', price: 3.00 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-80 lg:h-96 object-cover"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex space-x-2">
              {item.dietary.map((dietary) => (
                <div key={dietary} className="bg-white bg-opacity-90 rounded-full p-2">
                  {getDietaryIcon(dietary)}
                </div>
              ))}
            </div>
            
            {item.rating && (
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center space-x-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
            )}
          </div>

          {/* Additional Images Placeholder */}
          <div className="hidden lg:flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">+{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{item.preparationTime} min</span>
            </div>
            
            {item.spiceLevel && (
              <div className="flex items-center space-x-1">
                <Flame size={16} className={getSpiceLevelColor(item.spiceLevel)} />
                <span className={getSpiceLevelColor(item.spiceLevel)}>
                  {'🌶️'.repeat(item.spiceLevel)}
                </span>
              </div>
            )}

            {item.calories && (
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {item.calories} cal
              </span>
            )}
          </div>

          {/* Reviews */}
          {item.reviewCount && (
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${
                      i < Math.floor(item.rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {item.rating} ({item.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient) => (
                  <span 
                    key={ingredient}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customizations */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Customizations</h3>
            <div className="space-y-2">
              {customizationOptions.map((option) => (
                <label 
                  key={option.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedCustomizations.includes(option.id)}
                      onChange={() => handleCustomizationToggle(option.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-900">{option.name}</span>
                  </div>
                  {option.price > 0 && (
                    <span className="text-sm text-gray-600">+${option.price.toFixed(2)}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Special Instructions</h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or dietary restrictions?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!item.isAvailable}
                className="w-full"
                size="lg"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add {quantity} to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MenuItemModal;
