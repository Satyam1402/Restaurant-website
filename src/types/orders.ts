export interface IOrder {
  id: string;
  items: any[];
  total: number;
  deliveryInfo: any;
  paymentInfo: any;
  orderType: 'delivery' | 'pickup';
  status: string;
  estimatedDelivery: Date;
  createdAt: Date;
}