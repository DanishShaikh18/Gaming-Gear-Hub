import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Sample product data (Replace with real data from backend)
const products = [
  {
    id: "1",
    name: "Hydra Wired Gaming Earphones",
    price: "₹1,999",
    description: "Experience crystal-clear audio and deep bass with Hydra Wired Gaming Earphones.",
    image: "/images/earphones.jpg",
    links: [
      { site: "Amazon", url: "https://www.amazon.in" },
      { site: "Flipkart", url: "https://www.flipkart.com" },
    ],
  },
  {
    id: "2",
    name: "RGB Mechanical Gaming Keyboard",
    price: "₹5,499",
    description: "High-performance mechanical keyboard with customizable RGB lighting.",
    image: "/images/keyboard.jpg",
    links: [
      { site: "Amazon", url: "https://www.amazon.in" },
      { site: "Flipkart", url: "https://www.flipkart.com" },
    ],
  },
];

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="text-center mt-10 text-red-500">Product not found</div>;

  return (
    <div className="bg-primary text-text">
      {/* Navbar (Fixed) */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-accent mb-3">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-3">{product.description}</p>
          <p className="text-2xl font-semibold text-red-600">{product.price}</p>

          {/* Affiliate Links */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Buy From:</h3>
            <div className="flex space-x-4">
              {product.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {link.site}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
