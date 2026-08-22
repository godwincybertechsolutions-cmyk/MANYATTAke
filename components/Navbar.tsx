import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Calendar, Globe2, Coins } from 'lucide-react';
import { usePreferences, type Currency, type Language } from '../context/PreferencesContext';
import { NAVIGATION_LINKS, APP_NAME } from '../constants';
import { prefetchRoute } from '../utils/routePrefetch';
import { Z_INDEX } from '../tokens';

const LOGO_SRC = '/assets/Logo/New Manyatta Kenya Logo - Upscaled.webp';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currency, language, setCurrency, setLanguage } = usePreferences();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActiveLink = useCallback(
    (path: string) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path),
    [location.pathname]
  );

  const goToBooking = () => {
    navigate('/booking');
    setIsOpen(false);
  };

  const navLinkClass = (path: string) =>
    `whitespace-nowrap px-2.5 py-2 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wide transition-colors ${
      isActiveLink(path)
        ? scrolled
          ? 'text-primary bg-primary/10'
          : 'text-white bg-white/15'
        : scrolled
          ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
          : 'text-white/95 hover:text-white hover:bg-white/10'
    }`;

  const logoSize = scrolled ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-gray-100 py-2'
          : 'bg-gradient-to-b from-black/50 via-black/25 to-transparent py-3 sm:py-4'
      }`}
      style={{ zIndex: Z_INDEX.fixed }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-h-[3.25rem] sm:min-h-[3.5rem]">
          {/* Logo — blended directly into the navigation */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="shrink-0 flex items-center gap-2 sm:gap-3 group"
            aria-label={`${APP_NAME} — Home`}
          >
            <img
              src={LOGO_SRC}
              alt="New Manyatta Kenya logo"
              width={112}
              height={112}
              className={`${logoSize} w-auto object-contain object-center mix-blend-multiply transition-transform duration-300 group-hover:scale-105 group-active:scale-95`}
              decoding="async"
              fetchPriority="high"
            />
            <span
              className={`hidden sm:block font-serif text-sm md:text-base font-semibold leading-tight max-w-[11rem] md:max-w-none transition-colors ${
                scrolled ? 'text-dark' : 'text-white drop-shadow-sm'
              }`}
            >
              By Manyatta Tabasamu
            </span>
          </Link>

          {/* Desktop / tablet nav */}
          <div className="hidden md:flex flex-1 items-center justify-center min-w-0 px-1 lg:px-4">
            <div className="flex flex-wrap items-center justify-center gap-0.5 lg:gap-1 max-w-full">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => prefetchRoute(link.path)}
                  onFocus={() => prefetchRoute(link.path)}
                  className={navLinkClass(link.path)}
                  aria-current={isActiveLink(link.path) ? 'page' : undefined}
                >
                  <span className="hidden lg:inline">{link.name}</span>
                  <span className="lg:hidden">
                    {link.name === 'Mountain Villas'
                      ? 'Villas'
                      : link.name === 'Urban Apartments'
                        ? 'Apts'
                        : link.name === 'Safaris'
                          ? 'Safari'
                          : link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
            <label className={`flex items-center gap-1 rounded-full px-2 py-2 text-[10px] font-bold uppercase tracking-wide ${scrolled ? 'text-gray-700 bg-gray-50' : 'text-white bg-white/10'}`}>
              <Coins size={14} aria-hidden="true" />
              <span className="sr-only">Currency</span>
              <select aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="bg-transparent outline-none cursor-pointer">
                {(['KES', 'USD', 'EUR', 'GBP'] as Currency[]).map((option) => <option key={option} value={option} className="text-dark">{option}</option>)}
              </select>
            </label>
            <label className={`flex items-center gap-1 rounded-full px-2 py-2 text-[10px] font-bold uppercase tracking-wide ${scrolled ? 'text-gray-700 bg-gray-50' : 'text-white bg-white/10'}`}>
              <Globe2 size={14} aria-hidden="true" />
              <span className="sr-only">Language</span>
              <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="bg-transparent outline-none cursor-pointer">
                {(['English', 'Swahili', 'French', 'German'] as Language[]).map((option) => <option key={option} value={option} className="text-dark">{option}</option>)}
              </select>
            </label>
            <button
              type="button"
              onClick={goToBooking}
              className="flex items-center gap-1.5 bg-primary hover:bg-[#c4492e] text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
              aria-label="Book now"
            >
              <Calendar size={16} className="shrink-0" />
              <span className="hidden sm:inline">Book</span>
              <span className="hidden lg:inline"> Now</span>
            </button>
          </div>

          {/* Mobile: book + menu */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={goToBooking}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md active:scale-95"
              aria-label="Book now"
            >
              <Calendar size={18} />
            </button>
            <button
              type="button"
              className={`p-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                scrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/15'
              }`}
              onClick={() => setIsOpen((o) => !o)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 py-5 space-y-1">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium ${
                isActiveLink(link.path) ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              {link.name}
              <span className="text-gray-300">→</span>
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs font-bold uppercase tracking-wide text-gray-700">
                <Coins size={16} aria-hidden="true" />
                <span className="sr-only">Currency</span>
                <select aria-label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="min-w-0 flex-1 bg-transparent outline-none">
                  {(['KES', 'USD', 'EUR', 'GBP'] as Currency[]).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs font-bold uppercase tracking-wide text-gray-700">
                <Globe2 size={16} aria-hidden="true" />
                <span className="sr-only">Language</span>
                <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="min-w-0 flex-1 bg-transparent outline-none">
                  {(['English', 'Swahili', 'French', 'German'] as Language[]).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={goToBooking}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-dark text-white font-bold uppercase tracking-wider text-sm"
            >
              <Calendar size={18} />
              Book your stay
            </button>
          </div>
        </div>
      </div>

      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{
              width: `${Math.min(
                (window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)) * 100,
                100
              )}%`,
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
