import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';

const CheckoutForm = ({ amount, landTitle, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    }

    // In a real application, you would send the payment method to your backend
    // to create a payment intent and confirm the payment
    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      const mockPaymentResult = {
        id: `pi_${Date.now()}`,
        status: 'succeeded',
        amount: amount * 100, // Stripe uses cents
        currency: 'inr',
        payment_method: paymentMethod.id,
      };

      onSuccess(mockPaymentResult);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }

    setIsProcessing(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '12px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
        <p className="text-sm text-gray-600">Land: {landTitle}</p>
        <p className="text-lg font-bold text-green-600">Amount: ₹{amount.toLocaleString()}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaCreditCard className="inline mr-2" />
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaLock className="text-green-600" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FaCreditCard />
              Pay ₹{amount.toLocaleString()}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ amount, landTitle, onSuccess, onCancel }) => {
  return (
    <div className="max-w-md mx-auto">
      <CheckoutForm 
        amount={amount} 
        landTitle={landTitle} 
        onSuccess={onSuccess} 
        onCancel={onCancel} 
      />
    </div>
  );
};

export default PaymentForm;