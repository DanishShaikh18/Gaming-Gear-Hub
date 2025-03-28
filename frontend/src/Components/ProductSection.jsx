import { Link } from "react-router-dom";

const ProductSection = ({ title }) => {
  const products = [
    { id: 1, name: "Gaming Keyboard", price: "₹4,999", image: "https://www.fingers.co.in/secure/api/uploads/products/1713252661_New-angle.png" },
    { id: 2, name: "Gaming Mouse", price: "₹2,999", image: "https://www.fingers.co.in/secure/api/uploads/products/1713252661_New-angle.png" },
    { id: 3, name: "Gaming Headset", price: "₹3,499", image: "https://www.fingers.co.in/secure/api/uploads/products/1713252661_New-angle.png" },
    { id: 4, name: "Gaming Monitor", price: "₹14,999", image: "https://www.fingers.co.in/secure/api/uploads/products/1713252661_New-angle.png" }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-accent mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
              <p className="text-red-600 font-bold">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
