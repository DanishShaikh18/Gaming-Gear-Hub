import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/common/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  // Map category names to IDs
  const categoryMap = {
    keyboards: 1,
    mice: 2,
    headsets: 3,
    monitors: 4,
  };

  const categoryId = categoryMap[categoryName.toLowerCase()];

  useEffect(() => {
    if (!categoryId) return;

    fetch(`/api/products?category=${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);  // Set the fetched products to state
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, [categoryName]); // Fetch when categoryName changes

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize text-white">
        {categoryName} Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
