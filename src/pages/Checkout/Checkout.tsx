import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { clearCart } from '../../store/features/cart/cartSlice';
import Button from '../../components/ui/Button/Button';
import type { DeliveryInfo, PaymentInfo } from '../../types/checkout';


const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const items = useAppSelector(state => state.cart.items);
  const total = useAppSelector(state => state.cart.total);
  const itemCount = useAppSelector(state => state.cart.itemCount);
  
  // Local state
  const [currentStep, setCurrentStep] = useState(1); // 1: Delivery, 2: Payment, 3: Review
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculations
  const deliveryFee = orderType === 'delivery' ? (total > 50 ? 0 : 4.99) : 0;
  const tax = total * 0.08;
  const finalTotal = total + deliveryFee + tax;
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/menu');
    }
  }, [items, navigate]);
  
  // Handle form submissions
  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDeliveryInfo()) {
      setCurrentStep(2);
    }
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentInfo()) {
      setCurrentStep(3);
    }
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: `ORDER-${Date.now()}`,
        items,
        total: finalTotal,
        deliveryInfo: orderType === 'delivery' ? deliveryInfo : null,
        paymentInfo,
        orderType,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
        createdAt: new Date()
      };
      
      // Save order to localStorage (in real app, send to server)
      const existingOrders = JSON.parse(localStorage.getItem('user-orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('user-orders', JSON.stringify(existingOrders));
      
      // Clear cart
      dispatch(clearCart());
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { order } 
      });
      
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const validateDeliveryInfo = () => {
    return deliveryInfo.fullName && deliveryInfo.phone && deliveryInfo.email && 
           (orderType === 'pickup' || (deliveryInfo.address && deliveryInfo.city));
  };
  
  const validatePaymentInfo = () => {
    return paymentInfo.cardNumber && paymentInfo.expiryDate && 
           paymentInfo.cvv && paymentInfo.cardholderName;
  };
  
  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };
  
  if (items.length === 0) {
    return null; 
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/cart" className="mr-4">
              <ArrowLeft size={24} className="text-gray-600 hover:text-primary-600 transition-colors" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${currentStep >= step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {currentStep > step ? <CheckCircle size={20} /> : step}
                </div>
                {step < 3 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${currentStep > step ? 'bg-primary-500' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Delivery Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {orderType === 'delivery' ? 'Delivery Information' : 'Pickup Information'}
                </h2>
                
                {/* Order Type Selection */}
                <div className="mb-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        orderType === 'delivery' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <MapPin size={24} className={`mx-auto mb-2 ${orderType === 'delivery' ? 'text-primary-500' : 'text-gray-400'}`} />
                      <div className="text-center">
                        <p className="font-semibold">Delivery</p>
                        <p className="text-sm text-gray-600">30-45 mins</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setOrderType('pickup')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        orderType === 'pickup' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Clock size={24} className={`mx-auto mb-2 ${orderType === 'pickup' ? 'text-primary-500' : 'text-gray-400'}`} />
                      <div className="text-center">
                        <p className="font-semibold">Pickup</p>
                        <p className="text-sm text-gray-600">15-20 mins</p>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleDeliverySubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryInfo.fullName}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, fullName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={deliveryInfo.email}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  {orderType === 'delivery' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryInfo.address}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                          placeholder="Street address, apartment, suite, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryInfo.city}
                            onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryInfo.zipCode}
                            onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          value={deliveryInfo.deliveryInstructions}
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryInstructions: e.target.value})}
                          placeholder="Any special instructions for the delivery person..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}
            
            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({
                          ...paymentInfo, 
                          cardNumber: formatCardNumber(e.target.value)
                        })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <CreditCard size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" size="lg">
                      Review Order
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
                {/* Order Summary */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.menuItem.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                {/* Delivery/Pickup Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {orderType === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
                  </h3>
                  <p className="text-sm text-gray-600">{deliveryInfo.fullName}</p>
                  <p className="text-sm text-gray-600">{deliveryInfo.phone}</p>
                  {orderType === 'delivery' && (
                    <p className="text-sm text-gray-600">
                      {deliveryInfo.address}, {deliveryInfo.city} {deliveryInfo.zipCode}
                    </p>
                  )}
                </div>
                
                {/* Payment Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                  <p className="text-sm text-gray-600">
                    •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-600">{paymentInfo.cardholderName}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1" 
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - $${finalTotal.toFixed(2)}`}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Service Fee'}</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                {orderType === 'delivery' 
                  ? 'Estimated delivery: 30-45 minutes' 
                  : 'Ready for pickup: 15-20 minutes'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
