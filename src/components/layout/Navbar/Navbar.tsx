// src/components/layout/Navbar/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Phone } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Button from '../../ui/Button/Button';
import { logout } from '../../../store/features/auth/authSlice';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 🔥 Get cart count from Redux store
  const itemCount = useAppSelector(state => state.cart.itemCount);
  
  // 🔥 Safe auth state access with optional chaining and defaults
  const isAuthenticated = useAppSelector(state => state.auth?.isAuthenticated || false);
  const user = useAppSelector(state => state.auth?.user || null);
  
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Orders', path: '/orders' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors">
              RestaurantApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActiveLink(link.path)
                    ? 'text-primary-500'
                    : 'text-gray-700 hover:text-primary-500'
                }`}
              >
                {link.name}
                {isActiveLink(link.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 transition-colors hover:scale-105 transform duration-150"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">Call Us</span>
            </a>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <div className="p-2 text-gray-700 hover:text-primary-500 transition-colors hover:scale-105 transform duration-150">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* 🔥 Updated Auth Section - Shows user info if logged in */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Hi, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors px-3 py-1 rounded-md border border-gray-300 hover:border-primary-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}

            <Link to="/menu">
              <Button size="sm">Order Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Cart icon for mobile */}
            <Link to="/cart" className="relative">
              <div className="p-2 text-gray-700 hover:text-primary-500 transition-colors">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-primary-500 transition-colors active:scale-95 transform duration-150"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActiveLink(link.path)
                    ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-200 space-y-4">
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Phone size={20} />
                <span>Call Us: +1 (234) 567-890</span>
              </a>

              <div className="flex flex-col space-y-3 px-4">
                {/* 🔥 Updated Mobile Auth Section */}
                {isAuthenticated && user ? (
                  <>
                    <div className="text-center py-2">
                      <span className="text-gray-700">Hi, {user.name}!</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={closeMenu}>
                    <Button variant="outline" className="w-full justify-center">
                      <User size={16} className="mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
                
                <Link to="/menu" onClick={closeMenu}>
                  <Button className="w-full justify-center">Order Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
