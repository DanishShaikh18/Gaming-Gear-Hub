import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSection from "../Components/ProductSection";
import { useEffect, useState } from "react";

const Home = () => {
  const images = [
    "https://www.hp.com/us-en/shop/app/assets/images/uploads/prod/Must-Have%20HP%20Accessories%20for%20Your%20Gaming%20Setup1702592720003792.jpg",
    "https://i.extremetech.com/imagery/content-types/02kXhViCVHZUrcu8USJ6Ggv/hero-image.fit_lim.v1678673158.jpg",
    "https://staging.herovired.com/wp-content/uploads/2023/06/Know-About-the-Best-Gaming-Accessories-for-2023-2.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-primary text-text">
      {/* Announcement Bar (Will scroll away)
      <div className="bg-red-600 text-white text-center py-2 text-sm font-semibold">
        ⚡ Flash Sale: Get up to 50% off on gaming accessories! Limited time only! ⚡
      </div> */}

      {/* Fixed Navbar BELOW Announcement Bar */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Add padding to prevent content from being hidden behind the fixed navbar */}
      <div className="pt-[70px]">
        {/* Hero Section with Auto-Sliding Images */}
        <div className="relative w-full h-[500px] overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Product Sections */}
        <ProductSection title="Gaming Keyboards" />
        <ProductSection title="Gaming Mice" />
        <ProductSection title="Gaming Headsets" />
        <ProductSection title="Monitors & Accessories" />
      </div>
    </div>
  );
};

export default Home;
