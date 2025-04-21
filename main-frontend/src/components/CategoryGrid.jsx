import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories'); // If backend is on 5000
        const data = await response.json(); // This will fail if backend returns HTML instead of JSON

        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 text-center text-white">Loading categories...</section>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center font-['Rajdhani']">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative overflow-hidden rounded-xl aspect-square bg-gray-800"
            >
              <Link to={`/products/category/${category.id}`} className="block h-full w-full">
                <div className="w-full h-full">
                  <img
                    src={category.image_url || 'https://via.placeholder.com/400x400?text=Category+Image'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Category+Image';
                      e.target.className = 'w-full h-full object-contain p-8 bg-gray-700';
                    }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="absolute bottom-6 left-0 right-0 text-center text-2xl font-bold text-white font-['Rajdhani']">
                    {category.name}
                  </h3>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
