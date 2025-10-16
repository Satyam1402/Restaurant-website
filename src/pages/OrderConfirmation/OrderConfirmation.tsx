import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Phone, Mail, CreditCard } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import type { IOrder } from '../../types/orders';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as IOrder;
  
  // Redirect if no order data
  if (!order) {
    return <Navigate to="/menu" replace />;
  }
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your order. We're preparing your delicious meal!
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 inline-block">
            <p className="text-primary-700 font-semibold">
              Order #{order.id}
            </p>
          </div>
        </div>
        
        {/* Order Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-primary-600">
              {order.orderType === 'delivery' ? (
                <MapPin size={20} className="mr-2" />
              ) : (
                <Clock size={20} className="mr-2" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {order.orderType === 'delivery' ? 'Estimated Delivery' : 'Ready for Pickup'}
              </p>
              <p className="text-gray-600">
                {formatDate(order.estimatedDelivery)} at {formatTime(order.estimatedDelivery)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.menuItem.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    {item.customizations && item.customizations.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {item.customizations.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <p className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Delivery/Pickup Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {order.orderType === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
            </h3>
            
            {order.deliveryInfo && (
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-3 text-gray-400" />
                  <span>{order.deliveryInfo.phone}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  <span>{order.deliveryInfo.email}</span>
                </div>
                
                {order.orderType === 'delivery' && (
                  <div className="flex items-start text-gray-600">
                    <MapPin size={16} className="mr-3 text-gray-400 mt-0.5" />
                    <div>
                      <p>{order.deliveryInfo.address}</p>
                      <p>{order.deliveryInfo.city}, {order.deliveryInfo.zipCode}</p>
                    </div>
                  </div>
                )}
                
                {order.deliveryInfo.deliveryInstructions && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Instructions:</strong> {order.deliveryInfo.deliveryInstructions}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Payment Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
            
            <div className="flex items-center text-gray-600">
              <CreditCard size={16} className="mr-3 text-gray-400" />
              <div>
                <p>•••• •••• •••• {order.paymentInfo.cardNumber.slice(-4)}</p>
                <p className="text-sm">{order.paymentInfo.cardholderName}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu">
            <Button variant="outline" className="w-full sm:w-auto">
              Order More Food
            </Button>
          </Link>
          
          <Link to="/orders">
            <Button className="w-full sm:w-auto">
              View Order History
            </Button>
          </Link>
        </div>
        
        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Need help with your order?</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700">
              Call Us: (123) 456-7890
            </a>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
