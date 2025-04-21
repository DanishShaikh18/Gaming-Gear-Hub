import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";

const ProductCategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [affiliateLinks, setAffiliateLinks] = useState({});

  useEffect(() => {
    // Fetch category details
    fetch(`http://localhost:5000/api/categories/${categoryId}`)
      .then(res => res.json())
      .then(setCategory);

    // Fetch products for this category
    fetch(`http://localhost:5000/api/products?category=${categoryId}`)
      .then(res => res.json())
      .then(products => {
        setProducts(products);
        // Fetch affiliate links for each product
        products.forEach(product => {
          fetch(`http://localhost:5000/api/products/${product.id}/affiliate_links`)
            .then(res => res.json())
            .then(links => {
              setAffiliateLinks(prev => ({
                ...prev,
                [product.id]: links
              }));
            });
        });
      });
  }, [categoryId]);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddSuccess = async (newProduct) => {
    // Update state to include the new product
    setProducts(prev => [...prev, newProduct]);

    try {
      const res = await fetch(`http://localhost:5000/api/products?category=${categoryId}`);
      const updatedProducts = await res.json();
      setProducts(updatedProducts);
      
      // Update affiliate links
      const linksRes = await fetch(`http://localhost:5000/api/products/${newProduct.id}/affiliate_links`);
      const links = await linksRes.json();
      setAffiliateLinks(prev => ({
        ...prev,
        [newProduct.id]: links
      }));
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    
    // Also fetch affiliate links for the new product
    fetch(`http://localhost:5000/api/products/${newProduct.id}/affiliate_links`)
      .then(res => res.json())
      .then(links => {
        setAffiliateLinks(prev => ({
          ...prev,
          [newProduct.id]: links
        }));
      });

      if (newProduct.affiliateLinks?.length > 0) {
        setAffiliateLinks(prev => ({
          ...prev,
          [newProduct.id]: newProduct.affiliateLinks
        }));
      }
    
    setShowAddForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {category?.name || 'Loading...'} Products
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>
      
      {showAddForm && (
        <AddProductForm 
        defaultCategoryId={categoryId}
        onSuccess={(newProduct) => {
          setProducts([...products, newProduct]);
          setShowAddForm(false); // Close form after success
        }}
        onCancel={() => setShowAddForm(false)} // Close form on cancel
        />
      )}
      
      <ProductList 
        products={products}
        affiliateLinks={affiliateLinks}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
      />    
    </div>
  );
};

export default ProductCategoryPage;