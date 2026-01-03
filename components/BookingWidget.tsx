import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, ChevronDown, Search, Mountain, Binoculars, Building, Home, Map, Clock, Users as UsersIcon } from 'lucide-react';
import { PropertyType } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  NAVIGATION_LINKS, 
  BURGURET_VILLA_DETAILS, 
  NARUMORU_VILLA_DETAILS, 
  SAFARI_ITINERARIES, 
  URBAN_APARTMENTS 
} from '../constants';

// Map property types to constants data
const PROPERTY_OPTIONS = {
  mountain: [
    { 
      id: 1, 
      name: 'Burguret Mountainside Villa', 
      icon: Mountain, 
      description: 'Three Bedroom Villa on the Slopes of Mt. Kenya',
      location: 'Burguret, Kenya',
      details: BURGURET_VILLA_DETAILS
    },
    { 
      id: 2, 
      name: 'Narumoru Mountainside Villa', 
      icon: Mountain, 
      description: 'Three Bedroom Villa with River Frontage',
      location: 'Narumoru, Kenya',
      details: NARUMORU_VILLA_DETAILS
    }
  ],
  safari: SAFARI_ITINERARIES.map(safari => ({
    id: safari.id,
    name: safari.title,
    icon: Binoculars,
    description: safari.description,
    duration: safari.duration,
    locations: safari.locations,
    details: safari
  })),
  urban: URBAN_APARTMENTS.map(apartment => ({
    id: apartment.id,
    name: apartment.name,
    icon: Building,
    description: `${apartment.bedrooms} Bedroom Apartment`,
    location: apartment.name.includes('Laurel') ? 'Westlands, Nairobi' : 'Karen, Nairobi',
    details: apartment
  }))
} as const;

const BookingWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PropertyType>('mountain');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState({ adults: 2, children: 0, infants: 0 });
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(PROPERTY_OPTIONS.mountain[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Calculate min dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Update selected property when tab changes
  useEffect(() => {
    setSelectedProperty(PROPERTY_OPTIONS[activeTab][0]);
    setShowPropertyDropdown(false);
  }, [activeTab]);

  // Get navigation link based on active tab
  const getNavigationPath = () => {
    switch(activeTab) {
      case 'mountain': return NAVIGATION_LINKS.find(link => link.name === 'Mountain Villas')?.path || '/mountain-villas';
      case 'safari': return NAVIGATION_LINKS.find(link => link.name === 'Safaris')?.path || '/safaris';
      case 'urban': return NAVIGATION_LINKS.find(link => link.name === 'Apartments')?.path || '/urban-apartments';
      default: return '/';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For safaris, check-out date is calculated based on duration
    let finalCheckOutDate = checkOutDate;
    
    if (activeTab === 'safari' && !checkOutDate && checkInDate) {
      const safari = SAFARI_ITINERARIES.find(s => s.id === selectedProperty.id);
      if (safari) {
        const durationDays = parseInt(safari.duration.split(' ')[0]);
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkIn.getDate() + durationDays);
        finalCheckOutDate = checkOut.toISOString().split('T')[0];
        setCheckOutDate(finalCheckOutDate);
      }
    }

    // Validate dates
    if (!checkInDate) {
      alert('Please select a check-in date');
      setIsLoading(false);
      return;
    }

    if (activeTab !== 'safari' && !checkOutDate) {
      alert('Please select a check-out date');
      setIsLoading(false);
      return;
    }

    if (checkOutDate && new Date(checkOutDate) <= new Date(checkInDate)) {
      alert('Check-out date must be after check-in date');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Prepare query parameters
      const params = new URLSearchParams({
        type: activeTab,
        property: selectedProperty.id.toString(),
        checkIn: checkInDate,
        adults: guests.adults.toString(),
        children: guests.children.toString()
      });
      
      if (finalCheckOutDate) {
        params.append('checkOut', finalCheckOutDate);
      }
      if (guests.infants > 0) {
        params.append('infants', guests.infants.toString());
      }
      
      // Navigate to the appropriate page with parameters
      navigate(`${getNavigationPath()}?${params.toString()}`);
    }, 1000);
  };

  // Guest counter functions
  const updateGuestCount = (type: 'adults' | 'children' | 'infants', delta: number) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const getTotalGuests = () => guests.adults + guests.children;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden relative z-30 border border-gray-100/50"
      role="region" 
      aria-label="Booking availability checker"
    >
      {/* Header with tabs */}
      <div className="relative">
        {/* Background gradient based on active tab */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          activeTab === 'mountain' ? 'bg-gradient-to-r from-emerald-50 to-teal-50' :
          activeTab === 'safari' ? 'bg-gradient-to-r from-amber-50 to-orange-50' :
          'bg-gradient-to-r from-blue-50 to-indigo-50'
        }`} />
        
        <div className="relative flex" role="tablist">
          {(['mountain', 'safari', 'urban'] as PropertyType[]).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`flex-1 py-5 text-center font-semibold uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset relative ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {/* Active tab background */}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 ${
                    tab === 'mountain' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                    tab === 'safari' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                    'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab === 'mountain' && <Mountain size={18} />}
                {tab === 'safari' && <Binoculars size={18} />}
                {tab === 'urban' && <Building size={18} />}
                {tab === 'mountain' ? 'Mountain Villas' : 
                 tab === 'safari' ? 'Safari Packages' : 
                 'Urban Apartments'}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Form content */}
      <form 
        onSubmit={handleSubmit} 
        className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end"
      >
        {/* Property/Location Selector */}
        <div className="lg:col-span-2 relative">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 block" htmlFor="property">
            <MapPin size={14} className="inline mr-1" />
            Select Property
          </label>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary flex items-center justify-between group"
              aria-expanded={showPropertyDropdown}
              aria-haspopup="listbox"
              id="property-button"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeTab === 'mountain' ? 'bg-emerald-100 text-emerald-600' :
                  activeTab === 'safari' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <selectedProperty.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{selectedProperty.name}</div>
                  <div className="text-sm text-gray-500 truncate">{selectedProperty.description}</div>
                  {selectedProperty.location && (
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Map size={12} />
                      {selectedProperty.location}
                    </div>
                  )}
                </div>
              </div>
              <ChevronDown 
                size={20} 
                className={`text-gray-400 transition-transform duration-200 ${showPropertyDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {showPropertyDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-80 overflow-y-auto"
                  role="listbox"
                  aria-labelledby="property-button"
                >
                  {PROPERTY_OPTIONS[activeTab].map((property) => (
                    <button
                      key={property.id}
                      type="button"
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowPropertyDropdown(false);
                      }}
                      className="w-full p-4 hover:bg-gray-50 text-left transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                      role="option"
                      aria-selected={property.id === selectedProperty.id}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeTab === 'mountain' ? 'bg-emerald-50' :
                        activeTab === 'safari' ? 'bg-amber-50' :
                        'bg-blue-50'
                      }`}>
                        <property.icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{property.name}</div>
                        <div className="text-sm text-gray-500">{property.description}</div>
                        <div className="flex items-center gap-3 mt-1">
                          {property.location && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Map size={12} />
                              {property.location}
                            </span>
                          )}
                          {property.duration && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={12} />
                              {property.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      {property.id === selectedProperty.id && (
                        <div className={`w-2 h-2 rounded-full ${
                          activeTab === 'mountain' ? 'bg-emerald-500' :
                          activeTab === 'safari' ? 'bg-amber-500' :
                          'bg-blue-500'
                        }`} />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Check-in Date */}
        <div>
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 block" htmlFor="check-in">
            <Calendar size={14} className="inline mr-1" />
            Check In
          </label>
          <div className="relative">
            <input
              id="check-in"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={today}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-900 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
              required
              aria-label="Select check-in date"
            />
            {!checkInDate && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                Select date
              </span>
            )}
          </div>
        </div>

        {/* Check-out Date - Hidden for safaris */}
        {activeTab !== 'safari' && (
          <div>
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 block" htmlFor="check-out">
              <Calendar size={14} className="inline mr-1" />
              Check Out
            </label>
            <div className="relative">
              <input
                id="check-out"
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || tomorrow}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-900 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                required={activeTab !== 'safari'}
                aria-label="Select check-out date"
                disabled={!checkInDate}
              />
              {!checkOutDate && (
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  Select date
                </span>
              )}
            </div>
          </div>
        )}

        {/* Guests & CTA */}
        <div className={`${activeTab === 'safari' ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-2 lg:col-span-1'}`}>
          {/* Guest Selector */}
          <div className="relative mb-4">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2 block" htmlFor="guests">
              <Users size={14} className="inline mr-1" />
              Guests
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary flex items-center justify-between group"
                aria-expanded={showGuestDropdown}
                aria-haspopup="listbox"
                id="guests-button"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <UsersIcon size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTotalGuests()} Guest{getTotalGuests() !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {guests.adults} adult{guests.adults !== 1 ? 's' : ''}, {guests.children} child{guests.children !== 1 ? 'ren' : ''}
                      {guests.infants > 0 && `, ${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`}
                    </div>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-200 ${showGuestDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {showGuestDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4"
                    role="listbox"
                    aria-labelledby="guests-button"
                  >
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Adults</div>
                          <div className="text-sm text-gray-500">Ages 13+</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateGuestCount('adults', -1)}
                            disabled={guests.adults <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            aria-label="Decrease adult count"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{guests.adults}</span>
                          <button
                            type="button"
                            onClick={() => updateGuestCount('adults', 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase adult count"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Children</div>
                          <div className="text-sm text-gray-500">Ages 2-12</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateGuestCount('children', -1)}
                            disabled={guests.children <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            aria-label="Decrease children count"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{guests.children}</span>
                          <button
                            type="button"
                            onClick={() => updateGuestCount('children', 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase children count"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Infants</div>
                          <div className="text-sm text-gray-500">Under 2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateGuestCount('infants', -1)}
                            disabled={guests.infants <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                            aria-label="Decrease infant count"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{guests.infants}</span>
                          <button
                            type="button"
                            onClick={() => updateGuestCount('infants', 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase infant count"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/30 shadow-lg hover:shadow-xl active:scale-95 ${
              activeTab === 'mountain' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' :
              activeTab === 'safari' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' :
              'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
            } ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            aria-label="Check availability"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Search size={20} />
                <div className="text-left">
                  <div className="text-sm opacity-90">Check</div>
                  <div className="text-lg">Availability</div>
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </form>

      {/* Footer info */}
      <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Best Price Guarantee</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span>Flexible Cancellation</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>24/7 Support</span>
          </span>
        </div>
        <div className="text-primary font-medium flex items-center gap-2">
          <Home size={16} />
          <span>New Manyatta Kenya</span>
        </div>
      </div>

      {/* Mobile menu toggle for small screens */}
      <div className="lg:hidden border-t border-gray-200">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full py-3 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle booking details"
        >
          <ChevronDown 
            size={20} 
            className={`transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
          />
          <span>Booking Details</span>
        </button>
      </div>
    </motion.div>
  );
};

export default BookingWidget;