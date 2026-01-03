import React, { useState, useEffect } from 'react';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { PropertyType } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Simplified property options
const PROPERTY_OPTIONS = {
  mountain: [
    { id: 1, name: 'Burguret Villa', location: 'Mt. Kenya' },
    { id: 2, name: 'Narumoru Villa', location: 'Mt. Kenya' }
  ],
  safari: [
    { id: 3, name: 'Weekend Safari', duration: '2 nights' },
    { id: 4, name: 'Mt. Kenya Best', duration: '4 nights' },
    { id: 5, name: 'Circuit Safari', duration: '7 nights' }
  ],
  urban: [
    { id: 6, name: 'Laurel Hill', location: 'Westlands' },
    { id: 7, name: 'Alba Gardens', location: 'Karen' }
  ]
};

const BookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyType>('mountain');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState(2);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(PROPERTY_OPTIONS.mountain[0]);
  
  const navigate = useNavigate();

  // Calculate min dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Update selected property when tab changes
  useEffect(() => {
    setSelectedProperty(PROPERTY_OPTIONS[activeTab][0]);
  }, [activeTab]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkInDate) {
      alert('Please select a check-in date');
      return;
    }

    if (activeTab !== 'safari' && !checkOutDate) {
      alert('Please select a check-out date');
      return;
    }

    const params = new URLSearchParams({
      type: activeTab,
      property: selectedProperty.id.toString(),
      checkIn: checkInDate,
      guests: guests.toString()
    });
    
    if (checkOutDate) {
      params.append('checkOut', checkOutDate);
    }
    
    navigate(`/booking?${params.toString()}`);
  };

  const guestOptions = [1, 2, 3, 4, 5, 6];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      role="region" 
      aria-label="Booking availability checker"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50" role="tablist">
        {(['mountain', 'safari', 'urban'] as PropertyType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            className={`flex-1 py-4 text-center text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              activeTab === tab 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span className="hidden sm:inline">
              {tab === 'mountain' ? 'Mountain Villas' : 
               tab === 'safari' ? 'Safari Packages' : 
               'Urban Apartments'}
            </span>
            <span className="sm:hidden">
              {tab === 'mountain' ? 'Villas' : 
               tab === 'safari' ? 'Safaris' : 
               'Apartments'}
            </span>
          </button>
        ))}
      </div>

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Property Selector */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
              Property
            </label>
            <select
              value={selectedProperty.id}
              onChange={(e) => {
                const property = PROPERTY_OPTIONS[activeTab].find(p => p.id === Number(e.target.value));
                if (property) setSelectedProperty(property);
              }}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              aria-label="Select property"
            >
              {PROPERTY_OPTIONS[activeTab].map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                  {property.location ? ` - ${property.location}` : ''}
                  {property.duration ? ` (${property.duration})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
              Check In
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={today}
                className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                required
                aria-label="Select check-in date"
              />
            </div>
          </div>

          {/* Check-out Date - Hidden for safaris */}
          {activeTab !== 'safari' && (
            <div>
              <label className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                Check Out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || tomorrow}
                  className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required={activeTab !== 'safari'}
                  aria-label="Select check-out date"
                  disabled={!checkInDate}
                />
              </div>
            </div>
          )}

          {/* Guests & CTA */}
          <div className={`${activeTab === 'safari' ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-2 lg:col-span-1'}`}>
            <div className="grid grid-cols-2 gap-4">
              {/* Guest Selector */}
              <div className="relative">
                <label className="block text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                  Guests
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                    className="w-full p-3 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all flex items-center justify-between"
                    aria-expanded={showGuestDropdown}
                    aria-label="Select number of guests"
                  >
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-400 transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {showGuestDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      {guestOptions.map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setGuests(num);
                            setShowGuestDropdown(false);
                          }}
                          className={`w-full p-3 text-sm text-left hover:bg-gray-50 transition-colors ${
                            guests === num ? 'bg-primary/10 text-primary' : 'text-gray-700'
                          }`}
                        >
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Check Button */}
              <button
                type="submit"
                className={`bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 active:scale-95 ${
                  activeTab === 'safari' ? 'col-span-2 md:col-span-1' : ''
                }`}
                aria-label="Check availability"
              >
                <span className="hidden sm:block px-4 py-3">Check Availability</span>
                <span className="sm:hidden px-4 py-3">Check</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Best Price Guarantee
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Free Cancellation
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              24/7 Support
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingWidget;