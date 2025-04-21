import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';



const ProductCarousel = ({ category, products, title }) => {
  const filteredProducts = products.filter(p => p.category === category);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white font-['Rajdhani']">
          {title || category.toUpperCase()}
        </h3>
        <Link 
          to={`/products/${category}`} 
          className="text-cyan-400 hover:underline"
        >
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;