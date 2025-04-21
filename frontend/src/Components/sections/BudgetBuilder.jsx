import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../common/ProductCard';

// Mock data - replace with API later
const componentTypes = [
  { id: 'gpu', name: 'Graphics Card', min: 300, max: 2000 },
  { id: 'cpu', name: 'Processor', min: 150, max: 800 },
  { id: 'ram', name: 'RAM', min: 50, max: 300 },
  { id: 'storage', name: 'Storage', min: 50, max: 500 },
  { id: 'peripherals', name: 'Peripherals', min: 100, max: 600 }
];

const BudgetBuilder = () => {
  const [totalBudget, setTotalBudget] = useState(2000);
  const [allocations, setAllocations] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Initialize allocations
  useEffect(() => {
    const initialAllocations = {};
    componentTypes.forEach(comp => {
      initialAllocations[comp.id] = Math.floor((comp.min + comp.max) / 2);
    });
    setAllocations(initialAllocations);
  }, []);

  // Mock recommendation engine
  const generateRecommendations = () => {
    setIsCalculating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockRecommendations = [
        {
          id: 1,
          name: "RTX 4070 Ti",
          price: 799,
          category: "gpu",
          image: "/placeholder-gpu.jpg",
          rating: 4.7,
          match: "Excellent"
        },
        // Add 4-5 more mock recommendations
      ];
      
      setRecommendations(mockRecommendations);
      setIsCalculating(false);
    }, 1500);
  };

  const handleAllocationChange = (component, value) => {
    setAllocations(prev => ({
      ...prev,
      [component]: parseInt(value)
    }));
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-['Rajdhani']"
        >
          BUILD YOUR DREAM SETUP
        </motion.h2>

        {/* Budget Slider */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl text-white">Total Budget: ${totalBudget}</h3>
            <span className="text-cyan-400">${allocations && Object.values(allocations).reduce((a, b) => a + b, 0)} allocated</span>
          </div>
          <input
            type="range"
            min="1000"
            max="5000"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Component Allocators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {componentTypes.map((comp) => (
            <div key={comp.id} className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="text-white mb-3">{comp.name}</h4>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>${comp.min}</span>
                <span>${comp.max}</span>
              </div>
              <input
                type="range"
                min={comp.min}
                max={comp.max}
                value={allocations[comp.id] || comp.min}
                onChange={(e) => handleAllocationChange(comp.id, e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 mb-3"
              />
              <div className="text-right">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-white text-sm">
                  ${allocations[comp.id] || comp.min}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12">
          <button
            onClick={generateRecommendations}
            disabled={isCalculating}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  {/* Loading spinner icon */}
                </svg>
                GENERATING...
              </span>
            ) : (
              'GENERATE RECOMMENDATIONS'
            )}
          </button>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-['Rajdhani']">
              YOUR PERFECT BUILD
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BudgetBuilder;