import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <div className="text-center">
        <FaSpinner className="animate-spin h-16 w-16 text-sky-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;