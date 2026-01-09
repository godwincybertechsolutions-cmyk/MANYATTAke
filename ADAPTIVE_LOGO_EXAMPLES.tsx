/**
 * Adaptive Logo - Quick Usage Examples
 * Copy & paste ready examples for common use cases
 */

// ============================================
// EXAMPLE 1: Simple Logo in Hero Section
// ============================================
import AdaptiveLogo from '@/components/AdaptiveLogo';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-emerald-900 to-green-800 py-24">
      <div className="container mx-auto flex flex-col items-center gap-8 text-center">
        {/* Automatically selects inverted logo for dark background */}
        <AdaptiveLogo size="xl" />
        
        <h1 className="text-5xl font-bold text-white font-serif">
          Welcome to Manyatta Kenya
        </h1>
        <p className="text-xl text-emerald-100 max-w-2xl">
          Experience luxury in the wild
        </p>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 2: Logo with Text
// ============================================
export function BrandedHeader() {
  return (
    <header className="bg-white shadow-lg py-6">
      <div className="container mx-auto">
        {/* Shows original logo + text on white background */}
        <AdaptiveLogo 
          size="md" 
          showText 
          text="Manyatta Kenya"
          onClick={() => window.location.href = '/'}
        />
      </div>
    </header>
  );
}

// ============================================
// EXAMPLE 3: Using Hook for Custom Logic
// ============================================
import { useAdaptiveLogo } from '@/hooks/useAdaptiveLogo';
import OptimizedImage from '@/components/OptimizedImage';

export function CustomLogoImplementation() {
  const [scrolled, setScrolled] = React.useState(false);
  
  // Get adaptive logo based on scroll state
  const logoConfig = useAdaptiveLogo(scrolled);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <OptimizedImage
        src={logoConfig.src}
        alt={logoConfig.alt}
        width={120}
        height={40}
        className="h-10"
        title={`Contrast ratio: ${logoConfig.contrastRatio}:1 (${
          logoConfig.isInverted ? 'Inverted' : 'Original'
        } logo)`}
      />
      <span className="text-sm text-gray-600">
        {logoConfig.isInverted ? '🌙 Dark' : '☀️ Light'} Mode
      </span>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Section with Gradient Background
// ============================================
export function GradientSection() {
  return (
    <section className="bg-gradient-to-b from-purple-600 to-blue-600 py-16">
      <div className="container mx-auto flex flex-col items-center gap-6">
        {/* Automatically detects purple-to-blue gradient and selects best logo */}
        <AdaptiveLogo 
          size="lg"
          debug  // Shows contrast info in DevTools
        />
        <h2 className="text-3xl font-bold text-white">Our Mission</h2>
      </div>
    </section>
  );
}

// ============================================
// EXAMPLE 5: Footer with Dark Background
// ============================================
export function FooterWithLogo() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-3 gap-8">
        <div>
          {/* Dark footer automatically gets inverted logo */}
          <AdaptiveLogo size="md" />
          <p className="text-gray-400 mt-4">
            Bridging the gap between wilderness and luxury.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Properties</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-gray-400">+254 123 456 789</p>
          <p className="text-gray-400">hello@manyatta.com</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// EXAMPLE 6: Modal Header with Adaptive Logo
// ============================================
export function ModalWithLogo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-96">
            <div className="flex items-center justify-between mb-6">
              {/* Logo automatically selects based on white modal background */}
              <AdaptiveLogo size="sm" />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
            <p className="text-gray-600 mb-6">
              Discover the beauty of Manyatta Kenya
            </p>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// EXAMPLE 7: Using Static Function (Non-React)
// ============================================
import { getAdaptiveLogoPath } from '@/hooks/useAdaptiveLogo';

export function ServerSideRendering() {
  // Use this in server components or static generation
  const darkBgLogoPath = getAdaptiveLogoPath('rgb(20, 20, 20)');
  const lightBgLogoPath = getAdaptiveLogoPath('rgb(255, 255, 255)');
  
  return (
    <div>
      <img src={darkBgLogoPath} alt="Logo on dark bg" />
      <img src={lightBgLogoPath} alt="Logo on light bg" />
    </div>
  );
}

// ============================================
// EXAMPLE 8: Responsive Logo Sizes
// ============================================
export function ResponsiveLogoSection() {
  return (
    <div className="space-y-8">
      {/* Mobile - small */}
      <div className="sm:hidden">
        <AdaptiveLogo size="sm" />
      </div>
      
      {/* Tablet - medium */}
      <div className="hidden sm:flex md:hidden">
        <AdaptiveLogo size="md" />
      </div>
      
      {/* Desktop - large */}
      <div className="hidden md:flex lg:hidden">
        <AdaptiveLogo size="lg" />
      </div>
      
      {/* Extra large - extra large */}
      <div className="hidden lg:flex">
        <AdaptiveLogo size="xl" />
      </div>
    </div>
  );
}

// ============================================
// EXAMPLE 9: Clickable Logo with Navigation
// ============================================
import { useNavigate } from 'react-router-dom';

export function NavigableLogoHeader() {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto">
        <AdaptiveLogo 
          size="md"
          onClick={() => navigate('/')}
          className="cursor-pointer hover:opacity-75 transition-opacity"
        />
      </div>
    </header>
  );
}

// ============================================
// EXAMPLE 10: Debug Mode - Contrast Visualization
// ============================================
export function DebugLogoContrast() {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4">
        <AdaptiveLogo debug size="md" />
        <p className="text-sm text-gray-600">Hover to see contrast ratio</p>
      </div>
      
      <div className="bg-gray-900 p-4">
        <AdaptiveLogo debug size="md" />
        <p className="text-sm text-gray-300">Hover to see contrast ratio</p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
        <AdaptiveLogo debug size="md" />
        <p className="text-sm text-white">Hover to see contrast ratio</p>
      </div>
    </div>
  );
}

// ============================================
// USAGE SUMMARY
// ============================================
/*
 * QUICK START:
 * 
 * 1. Import AdaptiveLogo component:
 *    import AdaptiveLogo from '@/components/AdaptiveLogo';
 * 
 * 2. Use in your component:
 *    <AdaptiveLogo size="lg" />
 * 
 * 3. Logo automatically adapts to background!
 * 
 * AVAILABLE SIZES: 'sm' (40px) | 'md' (80px) | 'lg' (120px) | 'xl' (160px)
 * 
 * PROPS:
 * - size: Logo size (sm, md, lg, xl)
 * - showText: Display text alongside logo
 * - onClick: Make logo clickable
 * - debug: Show contrast info in title
 * - parentBg: Override background detection
 * - className: Custom CSS classes
 * 
 * WHEN TO USE:
 * - ✅ Navbar (with dynamic backgrounds)
 * - ✅ Footer (dark backgrounds)
 * - ✅ Hero sections (gradient backgrounds)
 * - ✅ Modals (varying backgrounds)
 * - ✅ Headers (any background)
 * - ✅ Branded sections (consistency)
 */
