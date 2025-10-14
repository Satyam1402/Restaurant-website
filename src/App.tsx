// src/App.tsx (add this useEffect)
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { loadCartFromStorage } from './store/middleware/persistenceMiddleware';
import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Orders from './pages/Orders/Orders';
import { loadUserFromStorage } from './store/features/auth/authSlice';
import Auth from './pages/Auth/Auth';

const App: React.FC = () => {
  useEffect(() => {
    // Load cart from localStorage when app starts
    loadCartFromStorage(store.dispatch);
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:category" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
