import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSection from "../Components/ProductSection";

const CategoryPage = ({ title, products }) => {
  return (
    <div className="bg-primary text-text">
      {/* Navbar (Fixed) */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      
      {/* Page Content */}
      <div className="pt-[70px] p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-accent mb-6">{title}</h1>
        <ProductSection title={title} products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
