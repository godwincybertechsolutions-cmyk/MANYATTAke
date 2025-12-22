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
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden -mt-16 relative z-30 hidden lg:block border border-gray-100" role="region" aria-label="Availability checker">
      {/* Tabs */}
      <div className="flex border-b border-gray-100" role="tablist">
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('mountain')}
          role="tab"
          aria-selected={activeTab === 'mountain'}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'mountain' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Mountain Villas
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('safari')}
          role="tab"
          aria-selected={activeTab === 'safari'}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'safari' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Safaris
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#f3f4f6" }}
          onClick={() => setActiveTab('urban')}
          role="tab"
          aria-selected={activeTab === 'urban'}
          className={`flex-1 py-4 text-center text-sm font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset ${activeTab === 'urban' ? 'bg-primary text-white shadow-md' : 'text-gray-500'
            }`}
        >
          Apartments
        </motion.button>
      </div>

      {/* Form */}
      <form className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); navigate('/others'); }}>
        {/* Location/Type Selector */}
        <div className="relative group cursor-pointer border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block" htmlFor="experience">Experience</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-dark font-serif text-lg" id="experience">
              <MapPin size={18} className="text-primary" aria-hidden="true" />
              <span>
                {activeTab === 'mountain' ? 'Narumoru' : activeTab === 'safari' ? 'All Parks' : 'Nairobi'}
              </span>
            </div>
            <ChevronDown size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Check In */}
        <div className="border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block" htmlFor="check-in">Check In</label>
          <div className="flex items-center gap-2 text-dark font-serif text-lg">
            <Calendar size={18} className="text-primary" aria-hidden="true" />
            <input
              id="check-in"
              type="date"
              className="outline-none w-full text-dark font-serif bg-transparent uppercase text-sm cursor-pointer focus:outline-none"
              aria-label="Check in date"
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="border-r border-gray-200 pr-4">
          <label className="text-xs text-gray-400 font-medium uppercase mb-1 block" htmlFor="check-out">Check Out</label>
          <div className="flex items-center gap-2 text-dark font-serif text-lg">
            <Calendar size={18} className="text-primary" aria-hidden="true" />
            <input
              id="check-out"
              type="date"
              className="outline-none w-full text-dark font-serif bg-transparent uppercase text-sm cursor-pointer focus:outline-none"
              aria-label="Check out date"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="submit"
          className="bg-dark hover:bg-black text-white rounded-lg flex flex-col items-center justify-center transition-all shadow-lg py-3 lg:h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="text-xs opacity-80 uppercase tracking-widest">Check</span>
          <span className="font-serif text-lg lg:text-xl italic">Availability</span>
        </button>
      </form>
    </div>
  );
};

export default BookingWidget;