import React, { useState } from 'react';
import { FaUniversity, FaShieldAlt, FaSpinner, FaCheck } from 'react-icons/fa';

const NetBankingPayment = ({ amount, landTitle, onSuccess, onCancel }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const popularBanks = [
    { code: 'SBI', name: 'State Bank of India', logo: '🏦' },
    { code: 'HDFC', name: 'HDFC Bank', logo: '🏛️' },
    { code: 'ICICI', name: 'ICICI Bank', logo: '🏦' },
    { code: 'AXIS', name: 'Axis Bank', logo: '🏛️' },
    { code: 'KOTAK', name: 'Kotak Mahindra Bank', logo: '🏦' },
    { code: 'PNB', name: 'Punjab National Bank', logo: '🏛️' }
  ];

  const otherBanks = [
    { code: 'BOB', name: 'Bank of Baroda' },
    { code: 'CANARA', name: 'Canara Bank' },
    { code: 'UNION', name: 'Union Bank of India' },
    { code: 'IOB', name: 'Indian Overseas Bank' },
    { code: 'FEDERAL', name: 'Federal Bank' },
    { code: 'IDBI', name: 'IDBI Bank' },
    { code: 'YES', name: 'Yes Bank' },
    { code: 'INDUSIND', name: 'IndusInd Bank' }
  ];

  const handleBankSelect = (bankCode) => {
    setSelectedBank(bankCode);
  };

  const handleProceed = () => {
    if (!selectedBank) return;
    
    setIsProcessing(true);
    
    // Simulate bank redirect and payment processing
    setTimeout(() => {
      // Simulate successful payment
      onSuccess({
        id: `NBT${Date.now()}`,
        method: 'Net Banking',
        bank: selectedBank,
        amount: amount
      });
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3">
          <FaUniversity className="text-3xl" />
          <div>
            <h2 className="text-xl font-bold">Net Banking Payment</h2>
            <p className="text-purple-100">Secure bank transfer</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="p-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Payment Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Land Property:</span>
              <span className="font-medium">{landTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-green-600">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">₹10</span>
            </div>
            <div className="border-t pt-1 flex justify-between">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-purple-600">₹{(amount + 10).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bank Selection */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-4">Select Your Bank</h4>
          
          {/* Popular Banks */}
          <div className="mb-6">
            <h5 className="text-sm font-medium text-gray-600 mb-3">Popular Banks</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularBanks.map((bank) => (
                <button
                  key={bank.code}
                  onClick={() => handleBankSelect(bank.code)}
                  className={`p-3 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                    selectedBank === bank.code
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{bank.logo}</span>
                    <div>
                      <p className="font-medium text-sm">{bank.name}</p>
                      <p className="text-xs text-gray-500">{bank.code}</p>
                    </div>
                  </div>
                  {selectedBank === bank.code && (
                    <FaCheck className="text-purple-600 float-right mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Other Banks */}
          <div>
            <h5 className="text-sm font-medium text-gray-600 mb-3">Other Banks</h5>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select your bank</option>
              {otherBanks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <FaShieldAlt className="text-blue-600 mt-1" />
            <div>
              <h5 className="font-semibold text-blue-800 mb-1">Secure Payment</h5>
              <p className="text-sm text-blue-700">
                You will be redirected to your bank's secure website to complete the payment. 
                Please ensure you're on your bank's official website before entering your credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleProceed}
            disabled={!selectedBank || isProcessing}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <FaSpinner className="animate-spin" />
                Redirecting to Bank...
              </>
            ) : (
              <>
                <FaUniversity />
                Proceed to Bank
              </>
            )}
          </button>
          
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">Payment Steps:</h5>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Select your bank from the list above</li>
            <li>Click "Proceed to Bank" to redirect to your bank's website</li>
            <li>Login with your net banking credentials</li>
            <li>Verify payment details and confirm the transaction</li>
            <li>You'll be redirected back after successful payment</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NetBankingPayment;