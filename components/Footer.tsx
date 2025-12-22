import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { APP_NAME } from '../constants';
import OptimizedImage from './OptimizedImage';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          
          {/* Brand */}
          <div className="space-y-6">
              <Link to="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
                <OptimizedImage 
                  src="/assets/Logo/New Manyatta Logo.png"
                  alt={APP_NAME}
                  className="h-16"
                  priority
                />
                <span className="font-serif text-2xl font-bold hidden sm:block">{APP_NAME}</span>
              </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging the gap between the majestic peaks of Mt. Kenya, the wild soul of the savannah, and the sophisticated pulse of Nairobi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="Twitter"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/mountain-villas" className="hover:text-white transition-colors">Mountain Villas</Link></li>
              <li><Link to="/safaris" className="hover:text-white transition-colors">Safari Experiences</Link></li>
              <li><Link to="/urban-apartments" className="hover:text-white transition-colors">Urban Living</Link></li>
              <li><Link to="/others" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Wildlife Drive,<br/>Narumoru, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span>concierge@newmanyatta.co.ke</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg mb-6 text-primary">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and safari tales.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <button className="bg-primary hover:bg-[#c4492e] text-white py-3 rounded text-sm font-medium tracking-wide transition-colors uppercase">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;