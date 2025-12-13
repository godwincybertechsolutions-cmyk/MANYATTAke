import React, { useState } from 'react';
import { Wifi, Shield, Coffee, Utensils, Check, Fish, Mountain, Camera } from 'lucide-react';
import { MOUNTAIN_VILLA_PRICING, BURGURET_IMAGES } from '../constants';
import SectionHeader from '../components/SectionHeader';
import { useNavigate } from 'react-router-dom';
import ImageSlideshowModal from '../components/ImageSlideshowModal';

const MountainVillas: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full pt-20">
      <ImageSlideshowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={BURGURET_IMAGES}
        title="Kirinyaga Haven - Burguret Villa"
      />

      {/* Hero */}
      <div className="relative h-[70vh] w-full">
        <img
          src="https://abirikenya.com/wp-content/uploads/2019/02/skogafoss-waterfall-dinamet7-water-161950.jpeg"
          alt="Kirinyaga Haven"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">Kirinyaga Haven</h1>
            <p className="text-white/90 text-xl font-light max-w-2xl mx-auto mb-8">
              Where the crisp mountain air meets unparalleled luxury at the foothills of Mt. Kenya.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-dark px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all flex items-center gap-2 mx-auto"
            >
              <Camera size={20} /> View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="py-20 bg-stone-50 -mt-20 relative z-20 rounded-t-[3rem]">
        <div className="container mx-auto px-6">
          <SectionHeader title="Your Stay Options" subtitle="Choose Your Experience" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOUNTAIN_VILLA_PRICING.map((tier, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col">
                <h3 className="font-serif text-2xl text-dark mb-2">{tier.title}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-primary text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-400 text-sm ml-2">{tier.unit}</span>
                </div>
                <div className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-primary flex items-center justify-center flex-shrink-0">
                        <Check size={12} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
                <button
                  className="w-full py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium uppercase text-xs tracking-widest"
                  onClick={() => navigate('/others')}
                >
                  Reserve Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Included Amenities</span>
              <h2 className="font-serif text-4xl mb-8">Effortless Living</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every stay at Kirinyaga Haven includes a dedicated team to ensure your comfort. From 24/7 security to daily housekeeping, we handle the details so you can focus on the view.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Shield className="text-primary" />
                  <span className="font-medium text-dark">24/7 Security</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Wifi className="text-primary" />
                  <span className="font-medium text-dark">High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Coffee className="text-primary" />
                  <span className="font-medium text-dark">Housekeeper</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                  <Mountain className="text-primary" />
                  <span className="font-medium text-dark">Gardener</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-dark rounded-2xl p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-serif text-3xl mb-6">Enhance Your Stay</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-800 rounded">
                        <Utensils size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Private Chef</h4>
                        <p className="text-xs text-gray-400">Custom menu, 3 meals/day</p>
                      </div>
                    </div>
                    <span className="font-serif text-lg text-primary">Ksh 2,000<span className="text-xs text-gray-500">/day</span></span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-800 rounded">
                        <Coffee size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Full Board</h4>
                        <p className="text-xs text-gray-400">All-inclusive catering</p>
                      </div>
                    </div>
                    <span className="font-serif text-lg text-primary">Ksh 6,000<span className="text-xs text-gray-500">/pp/day</span></span>
                  </div>
                </div>
                <button
                  className="mt-8 bg-primary hover:bg-[#c4492e] px-6 py-3 rounded text-sm font-medium transition-colors w-full"
                  onClick={() => navigate('/others')}
                >
                  Add to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Adventures Await" subtitle="Explore Nature" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Fish />, label: "Trout Fishing" },
              { icon: <Mountain />, label: "Hiking" },
              { icon: <Camera />, label: "Photography" },
              { icon: <Shield />, label: "Game Drives" }
            ].map((activity, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  {activity.icon}
                </div>
                <h4 className="font-serif font-medium text-lg">{activity.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountainVillas;
