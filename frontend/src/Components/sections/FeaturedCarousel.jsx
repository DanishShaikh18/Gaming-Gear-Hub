import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredItems = [
  {
    id: 1,
    title: "ULTIMATE GAMING SETUP",
    subtitle: "Premium Performance Bundle",
    image: "https://kreo-tech.com/cdn/shop/files/Artboard_1_e1409457-09a9-4594-b6ed-8bdd7575b1bc.png",
    cta: "SHOP NOW",
    colorScheme: "from-purple-600/90 to-cyan-500/90"
  },
  {
    id: 2,
    title: "ELITE GAMING GEAR",
    subtitle: "Pro-Level Equipment",
    image: "https://kreo-tech.com/cdn/shop/files/Artboard_1_e1409457-09a9-4594-b6ed-8bdd7575b1bc.png",
    cta: "EXPLORE",
    colorScheme: "from-cyan-600/90 to-purple-500/90"
  },
  {
    id: 3,
    title: "LIMITED EDITION BUNDLES",
    subtitle: "Exclusive Gaming Kits",
    image: "https://kreo-tech.com/cdn/shop/files/Artboard_1_e1409457-09a9-4594-b6ed-8bdd7575b1bc.png",
    cta: "DISCOVER",
    colorScheme: "from-purple-700/90 to-cyan-400/90"
  }
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % featuredItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => 
      prev === 0 ? featuredItems.length - 1 : prev - 1
    );
  };

  const variants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%'
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '-100%' : '100%',
      transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
    })
  };

  return (
    <div 
      className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-gray-900/50 hover:bg-purple-600 rounded-full p-3 transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-gray-900/50 hover:bg-purple-600 rounded-full p-3 transition-all backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Carousel Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={featuredItems[currentIndex].image}
              alt={featuredItems[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${featuredItems[currentIndex].colorScheme}`}></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
              <div className="max-w-4xl space-y-6">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-['Rajdhani'] tracking-tight"
                >
                  {featuredItems[currentIndex].title}
                </motion.h2>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-300 max-w-2xl"
                >
                  {featuredItems[currentIndex].subtitle}
                </motion.p>
                
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 px-8 py-3 bg-white text-gray-900 text-lg font-bold rounded-md hover:bg-gray-100 transition-all hover:scale-105"
                >
                  {featuredItems[currentIndex].cta}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicator Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {featuredItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index 
                ? 'w-6 bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;