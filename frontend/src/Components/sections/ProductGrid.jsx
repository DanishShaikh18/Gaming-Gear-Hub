import { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { useLocation } from 'react-router-dom';

const ProductGrid = ({ category = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Fetch products with abort controller
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/products${category ? `?category=${category}` : ''}`,
          { signal: abortController.signal }
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load products. Please try again later.');
          console.error("Fetch error:", err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => abortController.abort();
  }, [category, location.key]); // Add location.key to re-fetch on route changes

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 mb-4">⚠️ {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-['Rajdhani'] text-gray-300 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-4">
          {category ? `No ${category.replace('-', ' ')} available` : 'Inventory is empty'}
        </p>
        <a 
          href="/products" 
          className="text-cyan-400 hover:underline"
        >
          Browse all products
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category title */}
      {category && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 capitalize font-['Rajdhani']">
          {category.replace('-', ' ')}
        </h2>
      )}
      
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={`${product.id}-${location.key}`} // Unique key for route changes
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;