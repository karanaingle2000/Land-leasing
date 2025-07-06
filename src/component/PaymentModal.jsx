import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../utils/stripe';
import PaymentForm from './PaymentForm';
import { FaTimes } from 'react-icons/fa';

const PaymentModal = ({ isOpen, onClose, paymentData }) => {
  if (!isOpen) return null;

  const handlePaymentSuccess = (paymentResult) => {
    alert(`Payment successful! Transaction ID: ${paymentResult.id}`);
    onClose();
    // Here you would typically update the payment status in your database
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={paymentData?.amount || 0}
              landTitle={paymentData?.landTitle || ''}
              onSuccess={handlePaymentSuccess}
              onCancel={onClose}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;