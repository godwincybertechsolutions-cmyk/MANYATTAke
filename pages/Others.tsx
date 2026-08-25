import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Coffee, Heart, ArrowRight, ShoppingBag, Droplets, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import StoryModal from '../components/StoryModal';
import ImpactReportModal from '../components/ImpactReportModal';
import OptimizedImage from '../components/OptimizedImage';
import { COFFEE_PRODUCTS, CSR_PROJECTS, BLOG_POSTS, CONCIERGE_1_WHATSAPP } from '../constants';
import { usePreferences } from '../context/PreferencesContext';

const Others: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const { formatPrice } = usePreferences();
  return (
    <div className="w-full">
      <Helmet>
        <title>Experiences, Stories & Lifestyle | New Manyatta Kenya</title>
        <meta name="description" content="Explore curated lifestyle experiences, authentic Kenyan coffee, CSR initiatives, and travel stories. Discover the magic of Manyatta through our unique offerings." />
        <meta name="keywords" content="Kenya lifestyle, authentic coffee, CSR projects, travel stories, Manyatta experiences" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Curated Experiences & Lifestyle | New Manyatta Kenya" />
        <meta property="og:description" content="Discover curated lifestyle experiences and authentic Kenyan stories" />
        <meta property="og:image" content="/assets/Others Hero Image/The-Narumoru-Route-Climb-up-Mount-Kenya.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://newmanyattakenya.com/others" />
      </Helmet>
      {/* Hero */}
      <div className="relative h-[50vh] w-full bg-stone-900">
        <OptimizedImage 
          src="/assets/Others%20Hero%20Image/The-Narumoru-Route-Climb-up-Mount-Kenya.jpg" 
          alt="Curated Lifestyle" 
          fill
          priority
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        >
           <h1 className="font-serif text-5xl md:text-6xl text-white">Curated & Community</h1>
        </motion.div>
      </div>

      {/* Pantry + Merchandise */}
      <section className="pantry-section py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="section-kicker">The Pantry</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-dark md:text-6xl">Small-batch goods, rooted in place.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-600">A considered edit of Kenyan coffee and Manyatta essentials for slow mornings, open roads, and everything between.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="pantry-intro flex min-h-[360px] flex-col justify-between rounded-[2rem] p-7 md:p-9">
              <div>
                <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-primary text-white"><Coffee size={21} /></div>
                <h3 className="max-w-sm font-serif text-3xl text-white md:text-4xl">Coffee with a sense of origin.</h3>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                <span className="rounded-full border border-white/25 px-3 py-2">Single origin</span>
                <span className="rounded-full border border-white/25 px-3 py-2">Fair trade</span>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {COFFEE_PRODUCTS.map((product, index) => (
                <motion.article key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="product-card group">
                  <div className="product-image aspect-[4/3]">
                    <OptimizedImage src={product.image} alt={product.name} fill objectFit="cover" sizes="(max-width: 640px) 100vw, 40vw" className="transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-dark">{product.roast}</span>
                    <button aria-label={`Add ${product.name} to bag`} className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"><ShoppingBag size={17} /></button>
                  </div>
                  <div className="flex items-start justify-between gap-4 px-1 pt-4"><div><h3 className="font-serif text-2xl text-dark">{product.name}</h3><p className="mt-1 text-xs italic text-gray-500">{product.notes}</p></div><span className="pt-1 text-sm font-semibold text-primary">{formatPrice(product.price)}</span></div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="my-24 flex items-center gap-5"><span className="section-kicker">The Collection</span><div className="h-px flex-1 bg-gray-200" /></div>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h3 className="font-serif text-4xl text-dark md:text-5xl">Wear the journey.</h3><p className="mt-3 max-w-xl leading-6 text-gray-600">Thoughtfully made layers and travel essentials inspired by the Kenyan highlands.</p></div><div className="flex items-center gap-2 text-sm font-medium text-dark"><Heart size={17} className="text-primary" /> Signature essentials</div></div>
          <div className="grid gap-5 md:grid-cols-3">
            {[{ name: 'T-shirts', image: '/assets/Merch/New Manyatta T-Shirt Design.png', alt: 'Manyatta signature T-shirt', description: 'Premium cotton, made for everyday movement.', price: 'Ksh 2,800' }, { name: 'Caps', image: '/assets/Merch/New Manyatta Cap Design.png', alt: 'Manyatta signature cap', description: 'A breathable finish for bright days outside.', price: 'Ksh 3,500' }, { name: 'Hoodies', image: '/assets/Merch/New Manyatta Hoodie Design.png', alt: 'Manyatta signature hoodie', description: 'A warm layer for cool highland evenings.', price: 'Ksh 4,500' }].map((item, index) => (
              <motion.article key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="merch-card group"><div className="merch-image"><OptimizedImage src={item.image} alt={item.alt} fill objectFit="cover" sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" /><span className="absolute bottom-4 left-4 rounded-full bg-dark/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">Manyatta goods</span></div><div className="flex flex-1 flex-col p-5"><div className="flex items-start justify-between gap-3"><h4 className="font-serif text-2xl text-dark">{item.name}</h4><span className="text-sm font-semibold text-primary">{item.price}</span></div><p className="mt-2 flex-1 text-sm leading-6 text-gray-500">{item.description}</p><a href={CONCIERGE_1_WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-xs font-bold uppercase tracking-wider text-dark transition-colors hover:text-primary">Order via Concierge <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" /></a></div></motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block text-primary"><a href="#our-responsibility" className="hover:text-white transition-colors">Our Responsibility</a></span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-white">Giving Back</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CSR_PROJECTS.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-xl" 
                onClick={() => setSelectedReport(index)}
              >
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
                  <OptimizedImage 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <h3 className="font-serif text-2xl mb-4 text-primary">{project.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <motion.button 
                    whileHover={{ gap: "0.75rem" }}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-all"
                  >
                    Read Impact Report <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Gallery Split */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto px-4 lg:hidden">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block text-primary"><a href="#the-journal" className="hover:text-dark transition-colors">The Journal</a></span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-dark">Stories</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Blog Section (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-10">
                <BookOpen className="text-primary" />
                <a href="#the-journal" className="font-serif text-3xl text-dark hover:text-primary transition-colors">The Journal</a>
              </div>
              
              <div className="space-y-10">
                {BLOG_POSTS.map((post, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex flex-col sm:flex-row gap-6 items-start border-b border-gray-200 pb-10 last:border-0 cursor-pointer hover:bg-stone-50 p-4 -mx-4 rounded-lg transition-all duration-300"
                  >
                    <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                      <OptimizedImage 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{post.date}</span>
                      <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm mb-4">
                        {post.excerpt}
                      </p>
                      <motion.button 
                        whileHover={{ textDecoration: "underline", color: "#DD5536" }}
                        onClick={() => setSelectedStory(index)} 
                        className="text-dark text-sm font-medium underline decoration-gray-300 underline-offset-4 transition-all"
                      >
                        Read Story
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedStory !== null && (
        <StoryModal
          isOpen={selectedStory !== null}
          onClose={() => setSelectedStory(null)}
          title={BLOG_POSTS[selectedStory]?.title || ''}
          date={BLOG_POSTS[selectedStory]?.date || ''}
          image={BLOG_POSTS[selectedStory]?.image || ''}
          author={BLOG_POSTS[selectedStory]?.author || 'New Manyatta Team'}
          content={BLOG_POSTS[selectedStory]?.fullContent || BLOG_POSTS[selectedStory]?.excerpt || ''}
        />
      )}

      {selectedReport !== null && (
        <ImpactReportModal
          isOpen={selectedReport !== null}
          onClose={() => setSelectedReport(null)}
          title={CSR_PROJECTS[selectedReport]?.title || ''}
          description={CSR_PROJECTS[selectedReport]?.description || ''}
          image={CSR_PROJECTS[selectedReport]?.image || ''}
          reportContent={CSR_PROJECTS[selectedReport]?.reportContent || CSR_PROJECTS[selectedReport]?.description || ''}
          year="2024"
          impact={CSR_PROJECTS[selectedReport]?.impact || []}
        />
      )}
    </div>
  );
};

export default Others;
