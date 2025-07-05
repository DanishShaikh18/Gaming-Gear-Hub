import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    const cardWidth = container.clientWidth / 3;
    container.scrollTo({
      left: index * cardWidth * 3,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < Math.ceil(categories.length / 3) - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 text-center text-white">
        Loading categories...
      </section>
    );
  }

  return (
    <section className="py-20 w-full bg-black relative" style={{ overflow: 'visible', minHeight: '600px' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-['Rajdhani']">
          SHOP BY <span className='text-[#5FD421]'>CATEGORY</span>
        </h2>

        <div className="relative" style={{ height: '500px' }}>
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-4  top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-[#5FD522] text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
              currentIndex === 0 ? 'opacity-0 cursor-default' : ''
            }`}
            aria-label="Previous categories"
          >
            <FiChevronLeft size={28} />
          </button>
            
          <button
            onClick={handleNext}
            disabled={currentIndex >= Math.ceil(categories.length / 3) - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-[#5FD522] text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
              currentIndex >= Math.ceil(categories.length / 3) - 1 ? 'opacity-0 cursor-default' : ''
            }`}
            aria-label="Next categories"
          >
            <FiChevronRight size={28} />
          </button>

          {/* Carousel container with extra vertical space */}
          <div
            ref={carouselRef}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[32%] gap-8 overflow-x-hidden px-2"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative rounded-2xl bg-gray-800"
                style={{ height: '400px',overflow: 'visible' }}
              >
                <Link to={`/products/category/${category.id}`} className="block h-full w-full  rounded-2xl overflow-hidden relative border-3 border-transparent group-hover:border-[#5FD522] transition-all duration-300">
                  <div className="w-full h-full">
                    <img
                      src={category.image_url || 'https://via.placeholder.com/600x600?text=Category+Image'}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x600?text=Category+Image';
                        e.target.className = 'w-full h-full object-contain p-10 bg-gray-700';
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <h3 className="absolute bottom-6 left-0 right-0 text-center text-2xl font-bold text-white font-['Rajdhani'] px-4">
                      {category.name}
                    </h3>
                  </div>

                  <div className="absolute inset-0 border-1 border-transparent group-hover:border-[#5FD522] transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;