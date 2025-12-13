import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Mountain, LogIn, LogOut, User } from 'lucide-react';
import { NAVIGATION_LINKS, APP_NAME } from '../constants';
import { useAuth } from '../src/auth/AuthContext';
import { supabase } from '../src/supabaseClient';

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
  const { user } = useAuth();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
<Link to="/" className="flex items-center group"> 
  <img src="https://previews.dropbox.com/p/thumb/AC0gIHz5OkQtfL1xlA2zYv2jgSid9OnVl15xdhQ6QPzLV5UwF7uwq3i7DlAC24zbXHoqKpMZy7JX79Lx21ZZJYGkqnSBxjrYUGxctdW50mVPEQlRIiwrOYYkHZPQyRBeRzfHnSW5S21CC8TrG2KMK30il1uxVMnAU_gpH4rPz83MbYLOVyB15arlV1B3VDNZ8CkxdEBbuQKtzjggxJZRVMFXLqA56sDLUWMJimNSr8rLWsUYRsVpCHJh3MYsesBInTuwtLdEbWhWi1Noz_i5z7xjnJyb6EEH8vlsoVlPwfwjGoHDzVeAdwFSpEluBnn1I7n3q4kxJm3ulrtsPnqSZw-l/p.png" alt={APP_NAME} className={`h-10 ${scrolled ? '' : 'filter brightness-0 invert'}`} />
</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors ${
                scrolled ? 'text-dark' : 'text-white drop-shadow-sm'
              } ${location.pathname === link.path ? 'text-primary' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="bg-primary hover:bg-[#c4492e] text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-md"
            onClick={() => {
              if (!user) {
                navigate('/auth?redirect=' + encodeURIComponent(location.pathname));
                return;
              }
              // user has privilege to book
              navigate('/others');
            }}
          >
            Book Now
          </button>
          {user ? (
            <button
              className={`ml-4 inline-flex items-center gap-2 ${scrolled ? 'text-dark' : 'text-white'} hover:text-primary`}
              onClick={async () => { await supabase.auth.signOut(); }}
              title="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          ) : (
            <Link
              to="/auth"
              className={`ml-4 inline-flex items-center gap-2 ${scrolled ? 'text-dark' : 'text-white'} hover:text-primary`}
              title="Login"
            >
              <LogIn size={18} />
              <span className="text-sm">Login</span>
            </Link>
          )}
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
              if (!user) {
                navigate('/auth?redirect=' + encodeURIComponent(location.pathname));
                return;
              }
              navigate('/others');
            }}
          >
            Book Your Stay
          </button>
          {user ? (
            <button
              className="mt-3 inline-flex items-center gap-2 text-dark hover:text-primary"
              onClick={async () => { await supabase.auth.signOut(); }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/auth" className="mt-3 inline-flex items-center gap-2 text-dark hover:text-primary">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
