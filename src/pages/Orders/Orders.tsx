// src/pages/Orders/Orders.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Eye, Package } from 'lucide-react';
import Button from '../../components/ui/Button/Button';
import type { IOrder } from '../../types/orders';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load orders from localStorage (in real app, fetch from server)
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('user-orders');
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
            estimatedDelivery: new Date(order.estimatedDelivery)
          }));
          // Sort by newest first
          setOrders(parsedOrders.reverse());
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrders();
  }, []);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your food orders</p>
        </div>
        
        {/* Orders List */}
        {orders.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Package size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our delicious menu!
            </p>
            <Link to="/menu">
              <Button size="lg">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          // Orders Grid
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.menuItem.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500 flex-shrink-0">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Delivery Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    {order.orderType === 'delivery' ? (
                      <>
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span>Delivery to {order.deliveryInfo?.city}</span>
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span>Pickup Order</span>
                      </>
                    )}
                  </div>
                  
                  {order.status === 'confirmed' && (
                    <div className="flex items-center text-primary-600">
                      <Clock size={16} className="mr-1" />
                      <span>Ready by {formatTime(order.estimatedDelivery)}</span>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => {
                      // In a real app, this would navigate to order details page
                      alert(`Order details for ${order.id}\n\nItems: ${order.items.length}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}`);
                    }}
                  >
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => {
                      // Reorder functionality - add all items back to cart
                      alert('Reorder functionality would add all items back to cart');
                    }}
                  >
                    Order Again
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
