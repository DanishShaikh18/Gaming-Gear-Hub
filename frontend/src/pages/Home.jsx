import { Link } from 'react-router-dom';
import FeaturedCarousel from '../Components/sections/FeaturedCarousel';
import CategoryGrid from '../Components/sections/CategoryGrid';
import BuilderPromo from '../Components/sections/BuilderPromo';
import ProductCarousel from '../Components/sections/ProductCarousel';
import ProductCard from '../Components/common/ProductCard';

const products = [
  // Keep your existing product data
  // Ensure IDs are unique (currently multiple products have id:1)
  {
    id: 1, // Change to unique IDs
    name: "Razer DeathAdder V3",
    price: 69.99,
    category: "mouse",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTf0ziIrdSR-SHLWpjdiqkJyzTaYAgAp5ZKnKvUHRotfiZNLWKaLUk6avMyDotNRXrGkITUz69lzVZ0uiTG94BooiT3HiwJDet07dZjuOAg",
    rating: 4.7,
    isNew: true,
    isTrending: true // Add this new property
  },
  {
    id: 3, // Change to unique IDs
    name: "Razer DeathAdder V3",
    price: 69.99,
    category: "mouse",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTf0ziIrdSR-SHLWpjdiqkJyzTaYAgAp5ZKnKvUHRotfiZNLWKaLUk6avMyDotNRXrGkITUz69lzVZ0uiTG94BooiT3HiwJDet07dZjuOAg",
    rating: 4.7,
    isNew: true,
    isTrending: true // Add this new property
  },
  {
    id: 2,
    name: "Logitech G Pro X",
    price: 129.99,
    category: "keyboard",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTf0ziIrdSR-SHLWpjdiqkJyzTaYAgAp5ZKnKvUHRotfiZNLWKaLUk6avMyDotNRXrGkITUz69lzVZ0uiTG94BooiT3HiwJDet07dZjuOAg",
    rating: 4.8,
    isBestSeller: true // Existing property
  },
  // Add more products with proper IDs
];

const Home = () => {
  return (
    <div className="bg-gray-900">
      {/* 1. Hero Carousel (Above the fold) */}
      <FeaturedCarousel />

      {/* 2. Trending/Best Sellers (High-conversion section) */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white font-['Rajdhani']">
            TRENDING NOW
          </h2>
          <Link 
            to="/products/trending" 
            className="text-cyan-400 hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.isTrending)
            .slice(0, 4)
            .map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* 3. Builder Promo (Interactive CTA) */}
      {/* <BuilderPromo /> */}

      {/* 4. Category Grid (Navigation) */}
      <section className="container mx-auto py-12 px-4">
        <CategoryGrid />
      </section>

      {/* 5. Category Carousels (Discoverability) */}
      <section className="container mx-auto py-12 px-4 space-y-16">
        <ProductCarousel 
          category="mouse" 
          products={products} 
          title="TOP GAMING MICE"
        />
        <ProductCarousel 
          category="keyboard" 
          products={products} 
          title="MECHANICAL KEYBOARDS" 
        />
        <ProductCarousel 
          category="headset" 
          products={products} 
          title="IMMERSIVE HEADSETS"
        />
      </section>
    </div>
  );
};

export default Home;