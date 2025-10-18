import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { logoutAdmin } from '../../../store/features/admin/adminSlice';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentAdmin } = useSelector((state: RootState) => state.admin);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const hamburgerBtn = document.getElementById('hamburger-btn');
      
      if (sidebarOpen && sidebar && !sidebar.contains(event.target as Node) && 
          hamburgerBtn && !hamburgerBtn.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const adminMenuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
      permission: 'dashboard'
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: '🛵',
      permission: 'orders'
    },
    {
      name: 'Menu Management',
      href: '/admin/menu',
      icon: '🍽️',
      permission: 'menu'
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: '📋',
      permission: 'categories'
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: '👥',
      permission: 'customers'
    },
    {
      name: 'Staff Management',
      href: '/admin/staff',
      icon: '👨‍💼',
      permission: 'staff'
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: '📈',
      permission: 'analytics'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: '⚙️',
      permission: 'settings'
    }
  ];

  const handleLogout = () => {
    dispatch(logoutAdmin());
    setProfileDropdownOpen(false);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemClick = () => {
    // Close sidebar when menu item is clicked on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <div 
          id="mobile-sidebar"
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">🍽️</span>
              </div>
              <h1 className="text-white text-xl font-bold">Restaurant Admin</h1>
            </div>
            
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 pb-4 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
            <div className="space-y-1">
              {adminMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleMenuItemClick}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
                    ${location.pathname === item.href
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border-r-4 border-primary-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Enhanced Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4">
              {/* Left Section - Mobile Menu + Breadcrumb */}
              <div className="flex items-center space-x-4">
                <button
                  id="hamburger-btn"
                  onClick={handleSidebarToggle}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Breadcrumb */}
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">Admin Panel</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-medium text-sm capitalize">
                    {location.pathname.replace('/admin/', '') || 'dashboard'}
                  </span>
                </div>
                
                {/* Mobile title */}
                <div className="sm:hidden">
                  <h1 className="text-lg font-semibold text-gray-900 capitalize">
                    {location.pathname.replace('/admin/', '') || 'dashboard'}
                  </h1>
                </div>
              </div>

              {/* Center Section - Current Time (Hidden on mobile) */}
              <div className="hidden lg:flex items-center space-x-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Current Time</p>
                  <p className="text-sm font-medium text-gray-700">{getCurrentTime()}</p>
                </div>
              </div>

              {/* Right Section - Notifications & Profile */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 relative focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3-5H9l-3 5h5zm0 0v3a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3" />
                    </svg>
                    <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </button>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {currentAdmin?.name?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{currentAdmin?.name || 'Admin User'}</p>
                      <p className="text-xs text-gray-500 capitalize">{currentAdmin?.role?.replace('_', ' ') || 'Super Admin'}</p>
                    </div>
                    <svg className="h-4 w-4 text-gray-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentAdmin?.name}</p>
                        <p className="text-xs text-gray-500">{currentAdmin?.email}</p>
                        <p className="text-xs text-primary-600 font-medium mt-1 capitalize">
                          {currentAdmin?.role?.replace('_', ' ')} Access
                        </p>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/admin/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>
                        
                        <Link
                          to="/admin/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                        
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <svg className="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              {/* Left Section - Copyright */}
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                <p className="text-sm text-gray-600">
                  © {new Date().getFullYear()} <span className="font-medium text-primary-600">Restaurant Admin Panel</span>
                </p>
                <span className="hidden sm:inline text-gray-300">|</span>
                <p className="text-sm text-gray-500">
                  Powered by <span className="font-medium">RestaurantOS</span>
                </p>
              </div>

              {/* Right Section - System Status */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Database</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">API</span>
                </div>
                <div className="text-xs text-gray-500">
                  v2.1.0
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
