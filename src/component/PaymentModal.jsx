import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../utils/stripe';
import PaymentForm from './PaymentForm';
import PaymentOptions from './PaymentOptions';
import UPIPayment from './UPIPayment';
import NetBankingPayment from './NetBankingPayment';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, paymentData }) => {
  const [currentStep, setCurrentStep] = useState('options'); // 'options', 'card', 'upi', 'netbanking'
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen) return null;

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
    
    switch (method.id) {
      case 'card':
        setCurrentStep('card');
        break;
      case 'upi':
      case 'qr':
        setCurrentStep('upi');
        break;
      case 'netbanking':
        setCurrentStep('netbanking');
        break;
      case 'wallet':
        // Handle wallet payment
        handleWalletPayment(method);
        break;
      case 'paypal':
        // Handle PayPal payment
        handlePayPalPayment(method);
        break;
      case 'banktransfer':
        // Handle bank transfer
        handleBankTransfer(method);
        break;
      default:
        alert(`${method.name} payment method will be implemented soon!`);
    }
  };

  const handleWalletPayment = (method) => {
    alert(`Redirecting to ${method.name}...`);
    // Simulate wallet payment
    setTimeout(() => {
      handlePaymentSuccess({
        id: `WAL${Date.now()}`,
        method: method.name,
        amount: paymentData?.amount || 0
      });
    }, 2000);
  };

  const handlePayPalPayment = (method) => {
    alert('Redirecting to PayPal...');
    // Simulate PayPal payment
    setTimeout(() => {
      handlePaymentSuccess({
        id: `PP${Date.now()}`,
        method: 'PayPal',
        amount: paymentData?.amount || 0
      });
    }, 3000);
  };

  const handleBankTransfer = (method) => {
    const bankDetails = `
Bank Transfer Details:
Account Name: Land Lease Pro
Account Number: 1234567890
IFSC Code: HDFC0001234
Bank: HDFC Bank
Amount: ₹${paymentData?.amount?.toLocaleString()}

Please transfer the amount and share the transaction reference.
    `;
    alert(bankDetails);
    onClose();
  };

  const handlePaymentSuccess = (paymentResult) => {
    alert(`Payment successful! Transaction ID: ${paymentResult.id}`);
    onClose();
    setCurrentStep('options');
    setSelectedMethod(null);
  };

  const handleBack = () => {
    setCurrentStep('options');
    setSelectedMethod(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'options':
        return (
          <PaymentOptions
            amount={paymentData?.amount || 0}
            landTitle={paymentData?.landTitle || ''}
            onPaymentSelect={handlePaymentMethodSelect}
            onClose={onClose}
          />
        );
      
      case 'card':
        return (
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">Card Payment</h2>
            </div>
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={paymentData?.amount || 0}
                landTitle={paymentData?.landTitle || ''}
                onSuccess={handlePaymentSuccess}
                onCancel={handleBack}
              />
            </Elements>
          </div>
        );
      
      case 'upi':
        return (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">UPI Payment</h2>
            </div>
            <UPIPayment
              amount={paymentData?.amount || 0}
              landTitle={paymentData?.landTitle || ''}
              onSuccess={handlePaymentSuccess}
              onCancel={handleBack}
            />
          </div>
        );
      
      case 'netbanking':
        return (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-800">Net Banking</h2>
            </div>
            <NetBankingPayment
              amount={paymentData?.amount || 0}
              landTitle={paymentData?.landTitle || ''}
              onSuccess={handlePaymentSuccess}
              onCancel={handleBack}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {currentStep === 'options' ? (
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
            {renderCurrentStep()}
          </div>
        ) : (
          <div className="p-6">
            {renderCurrentStep()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;