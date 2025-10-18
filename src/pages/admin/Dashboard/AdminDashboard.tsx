import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { fetchDashboardStats } from '../../../store/features/admin/adminSlice';
import Card from '../../../components/common/Card';
import Button from '../../../components/ui/Button/Button';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, dashboardLoading } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const statsCards = [
    {
      title: 'Today\'s Orders',
      value: dashboardStats?.todayOrders || 0,
      icon: '📋',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Today\'s Sales',
      value: `$${dashboardStats?.todaySales?.toFixed(2) || '0.00'}`,
      icon: '💰',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Customers',
      value: dashboardStats?.totalCustomers || 0,
      icon: '👥',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Avg Order Value',
      value: `$${dashboardStats?.averageOrderValue?.toFixed(2) || '0.00'}`,
      icon: '📊',
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  if (dashboardLoading) {
    return (
      <div className="flex items-center justify-center h-32 sm:h-64">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <span className="text-sm">📊 Export Report</span>
          </Button>
          <Button 
            size="sm"
            onClick={() => dispatch(fetchDashboardStats())}
            className="w-full sm:w-auto"
          >
            <span className="text-sm">🔄 Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div key={index} className="min-w-0">
            <Card padding="sm" hover className="h-full">
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 p-2 sm:p-3 rounded-full ${stat.color} bg-opacity-20`}>
                  <span className="text-xl sm:text-2xl block">{stat.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                    {stat.title}
                  </p>
                  <p className={`text-lg sm:text-xl lg:text-2xl font-bold ${stat.textColor} truncate`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="w-full">
        <Card padding="sm">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="h-14 sm:h-16">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl mb-1">🍽️</span>
                <span className="text-xs sm:text-sm font-medium">Add Menu Item</span>
              </div>
            </Button>
            <Button variant="outline" className="h-14 sm:h-16">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl mb-1">📋</span>
                <span className="text-xs sm:text-sm font-medium">View Orders</span>
              </div>
            </Button>
            <Button variant="outline" className="h-14 sm:h-16">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl mb-1">👥</span>
                <span className="text-xs sm:text-sm font-medium">Manage Staff</span>
              </div>
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Orders & Popular Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="min-w-0">
          <Card padding="sm" className="h-full">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {dashboardStats?.recentOrders?.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="font-medium text-sm truncate">
                      Order #{order.id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-600 capitalize truncate">
                      {order.status}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-semibold text-sm">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No recent orders
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Popular Items */}
        <div className="min-w-0">
          <Card padding="sm" className="h-full">
            <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
            <div className="space-y-3">
              {dashboardStats?.popularItems?.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="min-w-0 flex-1 mr-3">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-600 truncate">
                      {item.orderCount} orders
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-semibold text-green-600 text-sm">
                      ${item.revenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No popular items
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
