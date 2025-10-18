import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AdminUser, DashboardStats } from '../../../types/admin'; // 👈 Add 'type'

// Async thunks for admin actions
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async () => {
    // For now, return mock data - replace with API call later
    const mockStats: DashboardStats = {
      todayOrders: 45,
      todaySales: 1250.50,
      totalCustomers: 1234,
      averageOrderValue: 27.80,
      popularItems: [
        { id: '1', name: 'Margherita Pizza', orderCount: 25, revenue: 312.50 },
        { id: '2', name: 'Chicken Burger', orderCount: 18, revenue: 269.82 },
        { id: '3', name: 'Caesar Salad', orderCount: 15, revenue: 134.85 },
      ],
      recentOrders: [
        { 
          id: '12345', 
          userId: 'user1', 
          items: [], 
          total: 45.50, 
          status: 'preparing', 
          createdAt: new Date().toISOString(),
          estimatedTime: 25 
        },
        { 
          id: '12346', 
          userId: 'user2', 
          items: [], 
          total: 32.80, 
          status: 'confirmed', 
          createdAt: new Date().toISOString(),
          estimatedTime: 30 
        }
      ],
      salesChart: []
    };
    
    return mockStats;
  }
);

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials: { email: string; password: string }) => {
    // Mock admin login - replace with API call later
    const mockAdmin: AdminUser = {
      id: 'admin1',
      email: credentials.email,
      name: 'Admin User',
      role: 'super_admin',
      permissions: [
        { module: 'dashboard', actions: ['read'] },
        { module: 'orders', actions: ['create', 'read', 'update', 'delete'] },
        { module: 'menu', actions: ['create', 'read', 'update', 'delete'] }
      ],
      restaurantId: 'restaurant1',
      createdAt: new Date().toISOString()
    };
    
    // Store admin token in localStorage
    localStorage.setItem('adminToken', 'mock-admin-token');
    localStorage.setItem('adminUser', JSON.stringify(mockAdmin));
    
    return mockAdmin;
  }
);

export const loadAdminFromStorage = createAsyncThunk(
  'admin/loadFromStorage',
  async () => {
    const adminUser = localStorage.getItem('adminUser');
    const adminToken = localStorage.getItem('adminToken');
    
    if (adminUser && adminToken) {
      return JSON.parse(adminUser) as AdminUser;
    }
    
    throw new Error('No admin user found in storage');
  }
);

// Admin state interface
interface AdminState {
  currentAdmin: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  dashboardStats: DashboardStats | null;
  dashboardLoading: boolean;
}

// Initial state
const initialState: AdminState = {
  currentAdmin: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  dashboardStats: null,
  dashboardLoading: false,
};

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.currentAdmin = null;
      state.isAuthenticated = false;
      state.error = null;
      state.dashboardStats = null;
      
      // Clear localStorage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    },
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login admin
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      
      // Load admin from storage
      .addCase(loadAdminFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAdminFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadAdminFromStorage.rejected, (state) => {
        state.loading = false;
        state.currentAdmin = null;
        state.isAuthenticated = false;
      })
      
      // Fetch dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.dashboardLoading = false;
      });
  },
});

export const { logoutAdmin, clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
