import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold">RestaurantApp</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience culinary excellence with fresh ingredients and authentic flavors. 
              Your satisfaction is our passion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'Orders', path: '/orders' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Food Street, Culinary District, City 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-500 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@restaurantapp.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Clock size={18} className="text-primary-500" />
              <span>Opening Hours</span>
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-gray-300">Mon - Thu</span>
                <span className="text-white">9:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-300">Fri - Sat</span>
                <span className="text-white">9:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-300">Sunday</span>
                <span className="text-white">10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} RestaurantApp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary-500 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
