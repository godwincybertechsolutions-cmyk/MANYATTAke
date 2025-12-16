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
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center group hover:opacity-80 transition-opacity">
          <OptimizedImage 
             src="/assets/Logo/New Manyatta Logo.png"
            alt={APP_NAME}
             className="h-12"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors ${scrolled ? 'text-dark' : 'text-white drop-shadow-sm'
                } ${location.pathname === link.path ? 'text-primary' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="bg-primary hover:bg-[#c4492e] text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-md"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fade-in-down">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-dark font-serif text-xl hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button
            className="bg-primary text-white w-full py-3 rounded-lg mt-4 font-medium"
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
