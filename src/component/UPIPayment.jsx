import React, { useState, useEffect } from 'react';
import { FaQrcode, FaMobile, FaCopy, FaCheck, FaSpinner } from 'react-icons/fa';

const UPIPayment = ({ amount, landTitle, onSuccess, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr' or 'id'
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const merchantUPI = 'landlease@paytm'; // Your UPI ID
  const transactionId = `TXN${Date.now()}`;
  
  // Generate UPI payment URL
  const upiUrl = `upi://pay?pa=${merchantUPI}&pn=Land Lease Pro&am=${amount}&cu=INR&tn=Payment for ${landTitle}&tr=${transactionId}`;

  useEffect(() => {
    if (paymentMethod === 'qr') {
      // Simulate QR code generation
      setTimeout(() => setQrGenerated(true), 1000);
    }
  }, [paymentMethod]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(merchantUPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    
    if (paymentMethod === 'qr') {
      // Open UPI app with payment URL
      window.open(upiUrl, '_blank');
    } else {
      // Simulate UPI ID payment
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess({
          id: transactionId,
          method: 'UPI',
          upiId: upiId,
          amount: amount
        });
      }, 3000);
    }
    
    // For QR code, we'll simulate payment completion after 10 seconds
    if (paymentMethod === 'qr') {
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess({
          id: transactionId,
          method: 'UPI QR',
          amount: amount
        });
      }, 10000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 text-center">
        <FaMobile className="text-3xl mx-auto mb-2" />
        <h2 className="text-xl font-bold">UPI Payment</h2>
        <p className="text-green-100">Fast & Secure</p>
      </div>

      {/* Payment Details */}
      <div className="p-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Land:</span>
              <span className="font-medium">{landTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-green-600">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Choose Payment Method</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('qr')}
              className={`p-3 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'qr'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <FaQrcode className="text-2xl mx-auto mb-1" />
              <span className="text-sm font-medium">QR Code</span>
            </button>
            <button
              onClick={() => setPaymentMethod('id')}
              className={`p-3 border-2 rounded-lg text-center transition-all ${
                paymentMethod === 'id'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <FaMobile className="text-2xl mx-auto mb-1" />
              <span className="text-sm font-medium">UPI ID</span>
            </button>
          </div>
        </div>

        {/* QR Code Payment */}
        {paymentMethod === 'qr' && (
          <div className="text-center mb-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4">
              {!qrGenerated ? (
                <div className="flex items-center justify-center h-48">
                  <FaSpinner className="text-4xl text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-48 h-48 mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaQrcode className="text-6xl text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">QR Code</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Scan with any UPI app to pay</p>
                </div>
              )}
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-700 mb-2">Or pay directly to UPI ID:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="bg-white px-3 py-1 rounded border text-sm">{merchantUPI}</code>
                <button
                  onClick={handleCopyUPI}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPI ID Payment */}
        {paymentMethod === 'id' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@paytm"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your UPI ID (e.g., 9876543210@paytm)
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePayNow}
            disabled={isProcessing || (paymentMethod === 'id' && !upiId)}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <FaSpinner className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FaMobile />
                Pay ₹{amount.toLocaleString()}
              </>
            )}
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-yellow-800 mb-2">Payment Instructions:</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Open any UPI app (PhonePe, Google Pay, Paytm)</li>
            <li>• Scan the QR code or enter the UPI ID</li>
            <li>• Verify the amount and merchant details</li>
            <li>• Complete the payment using your UPI PIN</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;