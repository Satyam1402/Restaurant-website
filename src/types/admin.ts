export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'manager' | 'staff' | 'kitchen';
  permissions: AdminPermission[];
  restaurantId: string;
  createdAt: string;
}

export interface AdminPermission {
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface DashboardStats {
  todayOrders: number;
  todaySales: number;
  totalCustomers: number;
  averageOrderValue: number;
  popularItems: PopularItem[];
  recentOrders: Order[];
  salesChart: SalesData[];
}

export interface PopularItem {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

// Import Order type from your existing types
export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
  estimatedTime: number;
}
