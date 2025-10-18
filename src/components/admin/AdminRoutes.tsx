import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from '../../pages/admin/Dashboard/AdminDashboard';
import AdminLogin from '../../pages/admin/Auth/AdminLogin';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.admin);

  // If not authenticated, show login page (NO layout)
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // If authenticated, show admin layout with routes
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add more admin routes here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
