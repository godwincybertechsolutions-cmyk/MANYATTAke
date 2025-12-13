import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mountain, Binoculars, Building2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import SectionHeader from '../components/SectionHeader';
import { useAuth } from '../src/auth/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Mock Video Background (using image with scale animation) */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="https://picsum.photos/seed/kenyahero/1920/1080" 
            alt="Kenya Landscape" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium"
          >
            Welcome to New Manyatta Kenya
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight max-w-5xl"
          >
            From Mountain Peaks <br/> to Urban Retreats
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/80 font-light text-lg italic mb-12"
          >
            Your Kenyan Sanctuary Awaits
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-primary hover:bg-[#c4492e] text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3 group"
            onClick={() => {
              if (!user) {
                navigate('/auth?redirect=' + encodeURIComponent(location.pathname));
                return;
              }
              navigate('/others');
            }}
          >
            Start Your Journey
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Booking Widget Wrapper */}
      <div className="container mx-auto px-4 relative z-40 mb-20">
        <BookingWidget />
      </div>

      {/* Experience Teasers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="The Trinity of Experience" subtitle="Curated For You" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Link to="/mountain-villas" className="group cursor-pointer">
              <div className="relative h-[500px] overflow-hidden rounded-xl mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src="https://twendesasa.com/wp-content/uploads/2023/09/List-Of-Best-Places-To-Visit-In-Kirinyaga-County.jpg" 
                  alt="Mountain Villas" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                  <Mountain className="mb-4 text-primary" size={32} />
                  <h3 className="font-serif text-3xl mb-2">Kirinyaga Haven</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Tranquil villas nestled in the misty slopes of Mt. Kenya.
                  </p>
                </div>
              </div>
            </Link>

             {/* Card 2 */}
             <Link to="/safaris" className="group cursor-pointer md:-mt-12">
              <div className="relative h-[500px] overflow-hidden rounded-xl mb-6 shadow-2xl">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src="https://ecoadventuresafaris.com/wp-content/uploads/2023/01/Kenya-1-1200x675.jpg" 
                  alt="Safari" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                  <Binoculars className="mb-4 text-primary" size={32} />
                  <h3 className="font-serif text-3xl mb-2">Wild Soul Safaris</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Immersive game drives connecting you to nature's rhythm.
                  </p>
                </div>
              </div>
            </Link>

             {/* Card 3 */}
             <Link to="/urban-apartments" className="group cursor-pointer">
              <div className="relative h-[500px] overflow-hidden rounded-xl mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src="https://laurelandhomes.com/wp-content/uploads/2018/06/appearance.jpg" 
                  alt="Urban Apartments" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
                  <Building2 className="mb-4 text-primary" size={32} />
                  <h3 className="font-serif text-3xl mb-2">Urban Retreats</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Sophisticated apartments in the heart of Nairobi.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-stone-100 relative overflow-hidden">
         <div className="container mx-auto px-6 text-center relative z-10">
           <span className="text-6xl text-primary font-serif opacity-30">"</span>
           <p className="font-serif text-3xl md:text-5xl text-dark leading-tight max-w-4xl mx-auto mb-8">
             We don't just offer a place to sleep. We offer a passage into the heart of Kenya, curated with elegance and warmth.
           </p>
           <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-gray-300"></div>
             <span className="text-xs font-bold uppercase tracking-widest text-gray-500">New Manyatta Philosophy</span>
             <div className="h-px w-12 bg-gray-300"></div>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
