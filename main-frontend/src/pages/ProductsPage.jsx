import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/category/${categoryId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);
  

  return (
    
    <section className="py-8 bg-black-900 text-white">
  <div className="container mx-auto px-2 sm:px-4">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-['Rajdhani'] text-center">
  
    </h2>

    {loading ? (
      <p className="text-center text-lg">Loading products...</p>
    ) : products.length === 0 ? (
      <p className="text-center text-lg">No products found in this category.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </div>
</section>

  );
};

export default ProductsPage;