import React, { useState } from 'react';
import { Calendar, Users, MapPin, ChevronDown } from 'lucide-react';
import { PropertyType } from '../types';
// import { useAuth } from '../src/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyType>('mountain');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden -mt-16 relative z-30 hidden md:block border border-gray-100">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('mountain')}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'mountain' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Mountain Villas
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('safari')}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'safari' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Safaris
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('urban')}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'urban' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Apartments
        </motion.button>
      </div>

      {/* Form */}
      <div className="p-6 grid grid-cols-4 gap-4 items-center">
        {/* Location/Type Selector */}
        <div className="relative group cursor-pointer border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Experience</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-dark font-serif text-lg">
              <MapPin size={18} className="text-primary" />
              <span>
                {activeTab === 'mountain' ? 'Narumoru' : activeTab === 'safari' ? 'All Parks' : 'Nairobi'}
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Check In */}
        <div className="border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Check In</label>
          <div className="flex items-center gap-2 text-dark font-serif text-lg">
            <Calendar size={18} className="text-primary" />
            <input
              type="date"
              className="outline-none w-full text-dark font-serif bg-transparent uppercase text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block">Check Out</label>
          <div className="flex items-center gap-2 text-dark font-serif text-lg">
            <Calendar size={18} className="text-primary" />
            <input
              type="date"
              className="outline-none w-full text-dark font-serif bg-transparent uppercase text-sm cursor-pointer"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          className="bg-dark hover:bg-black text-white h-full rounded-lg flex flex-col items-center justify-center transition-all shadow-lg"
          onClick={() => {
            navigate('/others');
          }}
        >
          <span className="text-xs opacity-80 uppercase tracking-widest">Check</span>
          <span className="font-serif text-xl italic">Availability</span>
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;