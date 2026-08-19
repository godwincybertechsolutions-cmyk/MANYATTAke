import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { NAVIGATION_LINKS, APP_NAME, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../constants';
import { prefetchRoute } from '../utils/routePrefetch';
import { Z_INDEX } from '../tokens';

const LOGO_SRC = '/assets/Logo/New Manyatta Logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
          {/* Logo — circular frame */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="shrink-0 flex items-center gap-2 sm:gap-3 group"
            aria-label={`${APP_NAME} — Home`}
          >
            <span
              className={`${logoSize} rounded-full flex items-center justify-center overflow-hidden border-2 shadow-lg transition-all duration-300 group-hover:scale-105 group-active:scale-95 ${
                scrolled
                  ? 'border-primary/20 bg-white'
                  : 'border-white/80 bg-white/95 ring-2 ring-white/30'
              }`}
            >
              <img
                src={LOGO_SRC}
                alt=""
                width={56}
                height={56}
                className="w-[78%] h-[78%] object-contain object-center"
                decoding="async"
              />
            </span>
            <span
              className={`hidden sm:block font-serif text-sm md:text-base font-semibold leading-tight max-w-[7rem] md:max-w-none transition-colors ${
                scrolled ? 'text-dark' : 'text-white drop-shadow-sm'
              }`}
            >
              <span className="block truncate">New Manyatta</span>
              <span className="block text-[10px] md:text-xs font-sans font-medium tracking-widest uppercase opacity-80">
                Kenya
              </span>
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
            {CONTACT_PHONE && (
              <a
                href={`tel:${CONTACT_PHONE}`}
                className={`hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-primary bg-gray-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
                aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
              >
                <Phone size={16} className="shrink-0" />
                <span className="truncate max-w-[9rem]">{CONTACT_PHONE_DISPLAY}</span>
              </a>
            )}

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

          <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
            {CONTACT_PHONE && (
              <a
                href={`tel:${CONTACT_PHONE}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gray-50 text-gray-800 font-medium"
              >
                <Phone size={18} />
                {CONTACT_PHONE_DISPLAY}
              </a>
            )}

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
