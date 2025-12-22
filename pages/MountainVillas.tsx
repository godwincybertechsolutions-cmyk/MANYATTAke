import React, { useState } from 'react';
import { MapPin, Check, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageSlideshowModal from '../components/ImageSlideshowModal';
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
    heroImage: "/assets/Burguret Mountainside Villa Section/Burguret. House Entrance.jpg"
  },
  {
    id: 'narumoru',
    details: NARUMORU_VILLA_DETAILS,
    images: NARUMORU_VILLA_DETAILS.images || [],
    heroImage: "/assets/Burguret Mountainside Villa Section/Burguret. House Entrance.jpg"
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
      <div className="relative h-[60vh] w-full">
        <img
          src="/assets/Mountain Villas Hero Image/Burguret. Outside Patio View 2.jpg"
          alt="Mountainside Haven"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-4xl px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 uppercase">Mountainside Haven</h1>
            <p className="text-white/90 text-xl font-light max-w-2xl mx-auto mb-8 tracking-wide">
              Experience the serenity of Mt. Kenya in our exclusive villas.
            </p>
          </div>
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

                  <div className="flex gap-4">
                    <button
                      onClick={() => openGallery(villa.images, villa.details.title)}
                      className="px-6 py-3 border border-dark text-dark rounded-full font-medium hover:bg-dark hover:text-white transition-all flex items-center gap-2 uppercase text-sm tracking-widest"
                    >
                      <Camera size={18} /> View Gallery
                    </button>
                    <button
                      onClick={() => navigate('/others')}
                      className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-[#c4492e] transition-all uppercase text-sm tracking-widest"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>

                {/* Images Grid */}
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <div className="col-span-2 h-64 rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => openGallery(villa.images, villa.details.title)}>
                    <img src={villa.heroImage} alt={villa.details.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  {/* Display 2 more small images if available */}
                  <div className="h-40 rounded-xl overflow-hidden hidden md:block">
                    <img src={villa.images[1] || villa.images[0]} className="w-full h-full object-cover" alt="Detail 1" />
                  </div>
                  <div className="h-40 rounded-xl overflow-hidden hidden md:block">
                    <img src={villa.images[2] || villa.images[0]} className="w-full h-full object-cover" alt="Detail 2" />
                  </div>
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