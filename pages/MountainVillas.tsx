import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AssetSlideshow from '../components/AssetSlideshow';
import {
  BURGURET_VILLA_DETAILS,
  BURGURET_IMAGES,
  NARUMORU_VILLA_DETAILS
} from '../constants';
import type { BookingLocationState } from '../types';
import { resolvePropertySlug } from '../constants';

const VILLAS = [
  {
    id: 'narumoru',
    details: NARUMORU_VILLA_DETAILS,
    images: NARUMORU_VILLA_DETAILS.images || [],
    heroImage: "/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-22-11-53-03.jpg"
  },
  {
    id: 'burguret',
    details: BURGURET_VILLA_DETAILS,
    images: BURGURET_IMAGES,
    heroImage: "/assets/Burguret Mountainside Villa Section/Burguret. House Entrance.jpg"
  },
];

const MountainVillas: React.FC = () => {
  const navigate = useNavigate();
  const reserveVilla = (villaId: string, title: string) => {
    const state: BookingLocationState = {
      slug: resolvePropertySlug(villaId),
      name: title,
      type: 'mountain',
    };
    navigate('/booking', { state });
  };
  return (
    <div className="w-full">
      <Helmet>
        <title>Mountain Villas | Luxury Stays in Narumoru | New Manyatta Kenya</title>
        <meta name="description" content="Discover exquisite mountain villas in Narumoru, Kenya. Enjoy premium amenities, breathtaking views, and unforgettable mountain retreats. Book your luxury villa experience now." />
        <meta name="keywords" content="mountain villas, Narumoru villas, luxury villas Kenya, mountain retreat" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mountain Villas | Luxury Mountain Retreats in Kenya" />
        <meta property="og:description" content="Luxury mountain villas with breathtaking views in Narumoru" />
        <meta property="og:image" content="/assets/Mountain Villas Hero Image/Burguret. House Entrance.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://newmanyattakenya.com/mountain-villas" />
      </Helmet>
      {/* Hero */}
      <div className="relative h-[58vh] min-h-[420px] w-full sm:h-[60vh]">
        <AssetSlideshow
          images={NARUMORU_VILLA_DETAILS.images || []}
          alt="Narumoru Mountain Villa"
          className="h-full w-full"
          imageClassName="object-center"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 text-center">
          <div className="max-w-4xl px-5 sm:px-6">
            <h1 className="font-serif text-4xl uppercase leading-tight text-white sm:text-5xl md:text-7xl">Mountain Villas</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light tracking-wide text-white/90 sm:text-xl">
              Experience the serenity of Mt. Kenya in our exclusive villas.
            </p>
          </div>
        </div>
      </div>

      {/* Villas List */}
      <div className="flex flex-col gap-0 py-20 bg-white">
        {VILLAS.map((villa, index) => (
          <motion.div 
            key={villa.id} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`common-section ${index % 2 === 1 ? 'bg-stone-50' : 'bg-white'} py-20`}
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className={`flex flex-col gap-8 sm:gap-12 md:flex-row md:items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Exclusive Villa</span>
                  <h2 className="font-serif text-4xl mb-6 text-dark">{villa.details.title}</h2>
                  <div className="flex items-center gap-2 text-primary font-medium mb-6">
                    <MapPin size={20} />
                    <span>{villa.details.location.main} • {villa.details.location.sub}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {villa.details.description}
                  </p>

                  <div className="p-7 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl border border-primary/20 shadow-sm mb-8 hover:border-primary/40 transition-colors">
                    <h4 className="font-serif text-xl mb-4 text-dark">Villa Highlights</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="text-primary shrink-0 mt-0.5" size={16} />
                        <span><strong>Living:</strong> {villa.details.offers.living[0]}</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="text-primary shrink-0 mt-0.5" size={16} />
                        <span><strong>Bedrooms:</strong> {villa.details.offers.bedrooms}</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className="text-primary shrink-0 mt-0.5" size={16} />
                        <span><strong>Kitchen:</strong> {villa.details.offers.kitchen}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => reserveVilla(villa.id, villa.details.title)}
                      className="min-h-12 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-md transition-all duration-300 hover:bg-[#c4492e] hover:shadow-lg active:scale-95 sm:w-auto sm:px-8"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:w-1/2 md:grid-cols-2">
                  <div className="group relative col-span-2 h-72 cursor-pointer overflow-hidden rounded-2xl sm:h-80">
                    <AssetSlideshow images={villa.images} alt={villa.details.title} className="h-full w-full" />
                  </div>
                  <div className="hidden h-44 overflow-hidden rounded-2xl md:block">
                    <img src={villa.id === 'narumoru' ? '/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-12-43.jpg' : villa.images[1] || villa.images[0]} className="h-full w-full object-cover" alt={`${villa.details.title} interior`} />
                  </div>
                  <div className="hidden h-44 overflow-hidden rounded-2xl md:block">
                    <img src={villa.id === 'narumoru' ? '/assets/NARUMORU%20VACATION%20HOME%20PICS/PHOTO-2026-05-18-21-13-55.jpg' : villa.images[2] || villa.images[0]} className="h-full w-full object-cover" alt={`${villa.details.title} detail`} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MountainVillas;
