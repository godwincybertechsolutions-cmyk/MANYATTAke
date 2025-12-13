import React from 'react';
import { Coffee, Heart, ArrowRight, ShoppingBag, Droplets, Camera, BookOpen } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import { COFFEE_PRODUCTS, CSR_PROJECTS, BLOG_POSTS, GALLERY_IMAGES } from '../constants';

const Others: React.FC = () => {
  return (
    <div className="w-full pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] w-full bg-stone-900">
        <img 
          src="https://picsum.photos/seed/coffeehero/1920/1080" 
          alt="Curated Lifestyle" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
           <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">Beyond the Stay</span>
           <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Curated & Community</h1>
           <p className="text-white/80 text-lg max-w-2xl font-light">
             From the rich soils of Mt. Elgon to the heart of our local communities.
           </p>
        </div>
      </div>

      {/* Coffee Showcase */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/2">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">The Pantry</span>
              <h2 className="font-serif text-4xl mb-6 text-dark">Mt. Elgon Reserve Coffee</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Grown in the volcanic soils of Mt. Elgon, our exclusive coffee selection brings the rich, complex flavors of the Kenyan highlands to your cup. Hand-picked, sun-dried, and roasted to perfection.
              </p>
              <div className="flex items-center gap-4 text-sm font-medium text-dark">
                <div className="flex items-center gap-2">
                  <Coffee size={18} className="text-primary" /> Single Origin
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-primary" /> Fair Trade
                </div>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {COFFEE_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group hover:shadow-lg transition-all">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-primary hover:bg-primary hover:text-white transition-colors">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                  <h3 className="font-serif text-xl mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">{product.roast}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-dark">{product.price}</span>
                    <span className="text-xs text-gray-400 italic">{product.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Additions Placeholder */}
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Droplets size={120} />
             </div>
             <span className="inline-block px-3 py-1 bg-orange-100 text-primary text-xs font-bold rounded-full mb-4 uppercase tracking-wider">Coming Soon</span>
             <h3 className="font-serif text-2xl mb-2">Organic Highland Honey</h3>
             <p className="text-gray-500 max-w-lg mx-auto">
               We are currently working with local apiaries to bring you pure, unprocessed honey from the Aberdare forests. Stay tuned.
             </p>
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Giving Back" subtitle="Our Responsibility" dark />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CSR_PROJECTS.map((project, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors">
                <div className="md:w-2/5 h-64 md:h-auto">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <h3 className="font-serif text-2xl mb-4 text-primary">{project.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    Read Impact Report <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Gallery Split */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Blog Section (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <BookOpen className="text-primary" />
                <h2 className="font-serif text-3xl text-dark">The Journal</h2>
              </div>
              
              <div className="space-y-10">
                {BLOG_POSTS.map((post, index) => (
                  <div key={index} className="group flex flex-col sm:flex-row gap-6 items-start border-b border-gray-100 pb-10 last:border-0">
                    <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{post.date}</span>
                      <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm mb-4">
                        {post.excerpt}
                      </p>
                      <button className="text-dark text-sm font-medium underline decoration-gray-300 hover:decoration-primary underline-offset-4 transition-all">Read Story</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Sidebar (1/3 width) */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <Camera className="text-primary" />
                <h2 className="font-serif text-3xl text-dark">Gallery</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {GALLERY_IMAGES.map((img, index) => (
                  <div key={index} className={`rounded-lg overflow-hidden relative group cursor-pointer ${index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                    <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-dark text-dark hover:bg-dark hover:text-white transition-colors rounded text-sm font-medium uppercase tracking-widest">
                View Full Gallery
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Others;