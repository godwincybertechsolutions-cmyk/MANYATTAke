import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_LINKS, APP_NAME } from '../constants';
import OptimizedImage from './OptimizedImage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group hover:opacity-75 transition-opacity duration-200">
          <OptimizedImage 
             src="/assets/Logo/New Manyatta Logo.png"
            alt={APP_NAME}
             className="h-12"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-widest uppercase px-4 py-2 rounded-lg transition-all duration-200 ${scrolled ? 'text-dark hover:bg-gray-100' : 'text-white hover:bg-white/10'
                } ${location.pathname === link.path ? (scrolled ? 'text-primary bg-primary/10' : 'text-white bg-white/20') : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="bg-primary hover:bg-[#c4492e] text-white px-7 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 hover:shadow-lg shadow-md ml-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => {
              navigate('/others');
            }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} color={scrolled ? '#2F2F2F' : '#FFFFFF'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col space-y-3 animate-fade-in-down border-t border-gray-100">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-dark font-serif text-lg hover:text-primary px-4 py-2 rounded-lg transition-all duration-200 ${location.pathname === link.path ? 'text-primary bg-primary/10' : 'hover:bg-gray-50'}`}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="bg-primary hover:bg-[#c4492e] text-white w-full py-3 rounded-lg mt-4 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => {
              navigate('/others');
            }}
          >
            Book Your Stay
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
