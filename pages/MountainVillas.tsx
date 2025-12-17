import React, { useState } from 'react';
import { MapPin, Check, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageSlideshowModal from '../components/ImageSlideshowModal';
import OptimizedImage from '../components/OptimizedImage';
import {
  BURGURET_VILLA_DETAILS,
  BURGURET_IMAGES,
  NARUMORU_VILLA_DETAILS
} from '../constants';

const VILLAS = [
  {
    id: 'burguret',
    details: BURGURET_VILLA_DETAILS,
    images: BURGURET_IMAGES,
    heroImage: "/assets/Burguret Mountainside Villa/Burguret. House Overall View.jpg"
  },
  {
    id: 'narumoru',
    details: NARUMORU_VILLA_DETAILS,
    images: NARUMORU_VILLA_DETAILS.images || [],
    heroImage: "https://picsum.photos/seed/narumoru_hero/1920/1080"
  }
];

const MountainVillas: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const openGallery = (images: string[], title: string) => {
    setSelectedImages(images);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  return (
    <div className="w-full pt-20">
      <ImageSlideshowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={selectedImages}
        title={selectedTitle}
      />

      {/* Hero */}
      <div>
        <div className="relative h-[60vh] w-full overflow-hidden">
          <OptimizedImage
            src="/assets/Burguret Mountainside Villa/Burguret. Outside Lounge Area.jpg"
            alt="Mountainside Haven"
            className=""
            fill
            priority
            objectFit="cover"
          />
        </div>
        <div className="container mx-auto px-6 py-6 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-dark mb-3 uppercase">Mountainside Haven</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Experience the serenity of Mt. Kenya in our exclusive villas.
          </p>
        </div>
      </div>

      {/* Villas List */}
      <div className="flex flex-col gap-20 py-20 bg-white">
        {VILLAS.map((villa, index) => (
          <div key={villa.id} className={`common-section ${index % 2 === 1 ? 'bg-stone-50 py-20' : ''}`}>
            <div className="container mx-auto px-6">
              <div className={`flex flex-col md:flex-row gap-12 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content */}
                <div className="md:w-1/2">
                  <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Exclusive Villa</span>
                  <h2 className="font-serif text-4xl mb-6 text-dark">{villa.details.title}</h2>
                  <div className="flex items-center gap-2 text-primary font-medium mb-6">
                    <MapPin size={20} />
                    <span>{villa.details.location.main} • {villa.details.location.sub}</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {villa.details.description}
                  </p>

                  <div className="p-6 bg-white/50 rounded-xl border border-gray-100 shadow-sm mb-8">
                    <h4 className="font-serif text-xl mb-4">Villa Highlights</h4>
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

                  <div className="flex gap-4 flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openGallery(villa.images, villa.details.title)}
                      className="px-6 py-3 border-2 border-dark text-dark rounded-full font-bold hover:bg-dark hover:text-white transition-all flex items-center gap-2 uppercase text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-dark/50"
                    >
                      <Camera size={18} /> View Gallery
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/others')}
                      className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-[#c4492e] transition-all uppercase text-sm tracking-widest shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      Reserve Now
                    </motion.button>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="md:w-1/2 grid grid-cols-2 gap-6">
                  <div>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="col-span-2 h-64 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300" 
                      onClick={() => openGallery(villa.images, villa.details.title)}
                    >
                      <OptimizedImage 
                        src={villa.heroImage} 
                        alt={villa.details.title} 
                        className="transition-transform duration-700 group-hover:scale-110"
                        fill
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    </motion.div>
                    <div className="mt-4">
                      <h3 className="font-serif text-xl font-semibold mb-1">{villa.details.title}</h3>
                      <p className="text-sm text-gray-600">{villa.details.location.main} • {villa.details.location.sub}</p>
                    </div>
                  </div>
                  {/* Display 2 more small images if available */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="h-40 rounded-xl overflow-hidden hidden md:block shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <OptimizedImage 
                      src={villa.images[1] || villa.images[0]} 
                      alt="Detail 1"
                      className="hover:scale-105 transition-transform duration-500"
                      fill
                      objectFit="cover"
                    />
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="h-40 rounded-xl overflow-hidden hidden md:block shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <OptimizedImage 
                      src={villa.images[2] || villa.images[0]} 
                      alt="Detail 2"
                      className="hover:scale-105 transition-transform duration-500"
                      fill
                      objectFit="cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MountainVillas;