import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const StatsCard = ({ title, value, icon: Icon, color, onClick, buttonText }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>
          <Icon className="text-white text-2xl" />
        </div>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      {onClick && (
        <button onClick={onClick} className="text-sm text-sky-600 hover:text-sky-700 font-medium inline-flex items-center mt-2 group">
          {buttonText}
          <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition" />
        </button>
      )}
    </div>
  );
};

export default StatsCard;