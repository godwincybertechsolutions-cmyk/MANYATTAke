import React, { useState } from 'react';
import { Wifi, Shield, Coffee, Utensils, Check, Fish, Mountain, Camera, Car, MapPin, Wind } from 'lucide-react';
import { BURGURET_VILLA_DETAILS, BURGURET_IMAGES } from '../constants';
import SectionHeader from '../components/SectionHeader';
import { useNavigate } from 'react-router-dom';
import ImageSlideshowModal from '../src/components/ImageSlideshowModal';

const MountainVillas: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full pt-20">
      <ImageSlideshowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={BURGURET_IMAGES}
        title={BURGURET_VILLA_DETAILS.title}
      />

      {/* Hero */}
      <div className="relative h-[80vh] w-full">
        <img
          src="/assets/Burguret Mountainside Villa/Burguret. House Overall View.jpg"
          alt="Burguret Villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 uppercase">Mountainside Haven</h1>
            <p className="text-white/90 text-xl font-light max-w-2xl mx-auto mb-8 tracking-wide">
              {BURGURET_VILLA_DETAILS.subtitle}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-dark px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all flex items-center gap-2 mx-auto uppercase text-sm tracking-widest"
            >
              <Camera size={20} /> View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Intro & Location */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <h2 className="font-serif text-4xl mb-6 text-dark">{BURGURET_VILLA_DETAILS.title}</h2>
              <div className="flex items-center gap-2 text-primary font-medium mb-6">
                <MapPin size={20} />
                <span>{BURGURET_VILLA_DETAILS.location.main} • {BURGURET_VILLA_DETAILS.location.sub}</span>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {BURGURET_VILLA_DETAILS.description}
              </p>
              <div className="p-6 bg-stone-50 rounded-xl border border-stone-100">
                <h4 className="font-serif text-xl mb-4">What It Offers</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="text-primary shrink-0 mt-0.5" size={16} />
                    <span><strong>Living Space:</strong> {BURGURET_VILLA_DETAILS.offers.living[0]}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="text-primary shrink-0 mt-0.5" size={16} />
                    <span><strong>Kitchen:</strong> {BURGURET_VILLA_DETAILS.offers.kitchen}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="text-primary shrink-0 mt-0.5" size={16} />
                    <span><strong>Bedrooms:</strong> {BURGURET_VILLA_DETAILS.offers.bedrooms}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="/assets/Burguret Mountainside Villa/Burguret. Living Room Overview.jpg" className="w-full h-64 object-cover rounded-lg" alt="Living Room" />
              <img src="/assets/Burguret Mountainside Villa/Burguret. Outside Patio View.jpg" className="w-full h-64 object-cover rounded-lg" alt="Patio" />
              <img src="/assets/Burguret Mountainside Villa/Burguret. Master Bedroom .jpg" className="col-span-2 w-full h-64 object-cover rounded-lg" alt="Bedroom" />
            </div>
          </div>
        </div>
      </section>

      {/* Services & Surroundings */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Experience & Surroundings" subtitle="Complete Immersion" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Services */}
            <div className="bg-white p-10 rounded-2xl shadow-sm">
              <h3 className="font-serif text-3xl mb-8 flex items-center gap-3">
                <Shield className="text-primary" /> Premium Services
              </h3>
              <ul className="space-y-4">
                {BURGURET_VILLA_DETAILS.services.map((service, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    {service}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Additional Amenities</h4>
                <div className="flex flex-wrap gap-3">
                  {BURGURET_VILLA_DETAILS.offers.amenities.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-stone-50 text-dark rounded-full text-sm font-medium">{item}</span>
                  ))}
                  {BURGURET_VILLA_DETAILS.offers.facilities.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-stone-50 text-dark rounded-full text-sm font-medium">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Surroundings */}
            <div className="bg-dark text-white p-10 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-serif text-3xl mb-8 flex items-center gap-3">
                  <MapPin className="text-primary" /> Nearby Attractions
                </h3>
                <p className="text-gray-400 mb-6">
                  Located on its own compound, our Villa is a hidden gem perched on the slopes of Mt Kenya offering breathtaking views of nature.
                </p>
                <div className="space-y-4">
                  {BURGURET_VILLA_DETAILS.surroundings.map((place, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                      <span className="group-hover:text-primary transition-colors">{place.name}</span>
                      <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-primary">{place.time}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/others')}
                  className="mt-10 w-full bg-primary hover:bg-[#c4492e] text-white py-4 rounded-lg font-bold uppercase tracking-widest transition-colors"
                >
                  Inquire For Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountainVillas;
