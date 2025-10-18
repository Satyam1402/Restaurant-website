import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { loadCartFromStorage } from './store/middleware/persistenceMiddleware';
import { loadUserFromStorage } from './store/features/auth/authSlice';
import { loadAdminFromStorage } from './store/features/admin/adminSlice';
import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation';
import Orders from './pages/Orders/Orders';
import Auth from './pages/Auth/Auth';
import AdminRoutes from './components/admin/AdminRoutes';

const App: React.FC = () => {
  useEffect(() => {
    loadCartFromStorage(store.dispatch);
    store.dispatch(loadUserFromStorage());
    store.dispatch(loadAdminFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Admin Routes - NO Layout wrapper */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Customer Routes - WITH Layout wrapper */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/menu" element={<Layout><Menu /></Layout>} />
          <Route path="/menu/:category" element={<Layout><Menu /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/order-confirmation" element={<Layout><OrderConfirmation /></Layout>} />
          <Route path="/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/auth" element={<Layout><Auth /></Layout>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
