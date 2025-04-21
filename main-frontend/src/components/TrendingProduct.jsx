import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TrendingProducts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/trending');
        const data = await response.json();
        setTrending(data);
      } catch (err) {
        console.error('Failed to load trending products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 text-center text-white">
        Loading trending products...
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#5be018f3] mb-12 text-center font-['Rajdhani']">
          TRENDING PRODUCTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16">
          {trending.map((product) => (
            <motion.div
              key={product.name}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="holographic-card group relative overflow-hidden rounded-xl shadow-xl"
            >
              <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-full relative">
                  <img
                    src={product.image_url || 'https://via.placeholder.com/400x400?text=Product+Image'}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                    }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6">
                  <h3 className="text-3xl font-bold text-white font-['Rajdhani'] mb-4">{product.name}</h3>
                  <p className="text-lg text-white font-['Rajdhani']">{product.short_desc}</p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#5be01890] transition-all duration-300" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .holographic-card {
          width: 100%;
          height: 100%;
          background: #111;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          transition: all 0.5s ease;
        }

        .holographic-card h3 {
  color: #5FD522;
  font-size: 2rem;
  position: relative;
  z-index: 2;
  /* Black text border */
  -webkit-text-stroke: 1px black; /* For Safari/Chrome */
  text-stroke: 1px black; /* Standard property */
  paint-order: stroke fill; /* Ensures border renders behind fill */
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; /* Fallback for browsers without text-stroke */
}
        .holographic-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            0deg,
            transparent,
            transparent 30%,
            rgba(144, 238, 144, 0.5) 70%,
            rgba(144, 238, 144, 0.2)
          );
          transform: rotate(-45deg);
          transition: all 0.5s ease;
          opacity: 0;
        }

        .holographic-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(144, 238, 144, 0.6);
        }

        .holographic-card:hover::before {
          opacity: 1;
          transform: rotate(-45deg) translateY(100%);
        }
      `}</style>
    </section>
  );
};

export default TrendingProducts;
