import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
        <div className="flex items-center justify-center mb-4">
          <FaTimesCircle className="text-rose-500 text-5xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 text-center mb-6">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:from-sky-600 hover:to-blue-700 transition shadow-md"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;