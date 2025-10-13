import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button/Button';

const Cart: React.FC = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const deliveryFee = total > 50 ? 0 : 4.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious items to your cart yet. 
              Start exploring our menu!
            </p>
            <Link to="/menu">
              <Button size="lg">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              to="/menu" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors mb-2"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Order ({itemCount} item{itemCount !== 1 ? 's' : ''})
            </h1>
          </div>
          
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start space-x-4">
                  {/* Item Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.menuItem.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {item.menuItem.description}
                    </p>
                    
                    {/* Customizations */}
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">Customizations:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.customizations.map((customization) => (
                            <span 
                              key={customization}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              {customization}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-bold text-gray-900">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - FIXED SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              {/* Header */}
              <div className="p-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Price Breakdown */}
              <div className="px-6 pb-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Delivery Notice */}
                {deliveryFee > 0 && (
                  <div className="mt-4 text-sm text-primary-600 bg-primary-50 p-3 rounded-lg">
                    Add ${(50 - total).toFixed(2)} more for free delivery!
                  </div>
                )}
                
                {/* Total */}
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons - FIXED SPACING */}
              <div className="p-6 pt-0 space-y-3">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                
                <Link to="/menu" className="block">
                  <Button variant="outline" className="w-full" size="md">
                    Add More Items
                  </Button>
                </Link>
              </div>

              {/* Footer Info */}
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-500 text-center">
                  Estimated delivery time: 30-45 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
