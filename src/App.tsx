import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:category" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<div className="pt-20 p-8">Orders Page - Coming Soon</div>} />
            <Route path="/auth" element={<div className="pt-20 p-8">Auth Page - Coming Soon</div>} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
};

export default App;
