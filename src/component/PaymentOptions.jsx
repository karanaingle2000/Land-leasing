import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaUniversity, FaMobile, FaQrcode, FaWallet, FaMoneyBillWave, FaShieldAlt, FaCheck } from 'react-icons/fa';

const PaymentOptions = ({ amount, landTitle, onPaymentSelect, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <FaCreditCard className="text-2xl text-blue-600" />,
      description: 'Visa, Mastercard, RuPay',
      processingFee: '2.9%',
      processingTime: 'Instant',
      popular: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: <FaMobile className="text-2xl text-green-600" />,
      description: 'PhonePe, Google Pay, Paytm',
      processingFee: 'Free',
      processingTime: 'Instant',
      popular: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <FaUniversity className="text-2xl text-purple-600" />,
      description: 'All major banks supported',
      processingFee: '₹10',
      processingTime: 'Instant'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <FaWallet className="text-2xl text-orange-600" />,
      description: 'Paytm, PhonePe, Amazon Pay',
      processingFee: '1.5%',
      processingTime: 'Instant'
    },
    {
      id: 'qr',
      name: 'QR Code',
      icon: <FaQrcode className="text-2xl text-indigo-600" />,
      description: 'Scan & Pay with any UPI app',
      processingFee: 'Free',
      processingTime: 'Instant'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal className="text-2xl text-blue-500" />,
      description: 'International payments',
      processingFee: '3.5%',
      processingTime: 'Instant'
    },
    {
      id: 'banktransfer',
      name: 'Bank Transfer',
      icon: <FaMoneyBillWave className="text-2xl text-green-700" />,
      description: 'NEFT/RTGS/IMPS',
      processingFee: 'Free',
      processingTime: '1-2 hours'
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowDetails(true);
  };

  const handleProceed = () => {
    onPaymentSelect(selectedMethod);
  };

  const calculateTotal = () => {
    if (!selectedMethod) return amount;
    
    let fee = 0;
    if (selectedMethod.processingFee.includes('%')) {
      const percentage = parseFloat(selectedMethod.processingFee.replace('%', ''));
      fee = (amount * percentage) / 100;
    } else if (selectedMethod.processingFee.includes('₹')) {
      fee = parseFloat(selectedMethod.processingFee.replace('₹', ''));
    }
    
    return amount + fee;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Choose Payment Method</h2>
        <div className="flex items-center gap-2 text-green-100">
          <FaShieldAlt />
          <span className="text-sm">Secure & Encrypted Payment</span>
        </div>
      </div>

      {/* Payment Details */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Land Property</p>
            <p className="font-semibold text-gray-800">{landTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="font-semibold text-gray-800">₹{amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Payable</p>
            <p className="font-bold text-green-600 text-lg">₹{calculateTotal().toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Payment Methods List */}
        <div className="lg:w-2/3 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleMethodSelect(method)}
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedMethod?.id === method.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {method.popular && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">{method.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{method.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Fee: {method.processingFee}</span>
                      <span className="text-gray-500">{method.processingTime}</span>
                    </div>
                  </div>
                  {selectedMethod?.id === method.id && (
                    <FaCheck className="text-green-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details Sidebar */}
        <div className="lg:w-1/3 bg-gray-50 p-6 border-l">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
          
          {selectedMethod ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  {selectedMethod.icon}
                  <div>
                    <h4 className="font-semibold text-gray-800">{selectedMethod.name}</h4>
                    <p className="text-sm text-gray-600">{selectedMethod.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Amount:</span>
                    <span className="font-medium">₹{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium">
                      {selectedMethod.processingFee === 'Free' 
                        ? 'Free' 
                        : `₹${(calculateTotal() - amount).toLocaleString()}`
                      }
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-semibold text-gray-800">Total:</span>
                    <span className="font-bold text-green-600">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">Payment Features</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Secure 256-bit SSL encryption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>PCI DSS compliant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Instant payment confirmation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleProceed}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaShieldAlt />
                  Proceed to Pay ₹{calculateTotal().toLocaleString()}
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FaCreditCard className="text-4xl mx-auto mb-4 text-gray-300" />
              <p>Select a payment method to continue</p>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-100 p-4 border-t">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <FaShieldAlt className="text-green-600" />
          <span>Your payment information is protected with bank-level security</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;