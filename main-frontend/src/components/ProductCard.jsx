import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="relative bg-[#0f1115] rounded-2xl border border-[#0f1115] p-6 w-full sm:max-w-[360px] mx-auto group overflow-hidden shadow-md"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0 rounded-2xl" />

      {/* Product Image */}
      <div className="relative z-10 overflow-hidden rounded-lg mb-5">
        <img
          src={product.image_url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="relative z-10">
        <h3 className="text-[1.5rem] font-bold mb-2 font-['Rajdhani'] text-cyan-200 text-center">
          {product.name}
        </h3>
          <p className="text-white text-center mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

      </div>

      {/* Affiliate Links */}
      <div className="relative z-10 flex flex-col gap-3">
      {product.affiliate_links && product.affiliate_links.map((link, idx) => (
  <a
    key={idx}
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex justify-between items-center p-[12px] rounded-lg bg-[#1a1c20] overflow-hidden group/btn cursor-pointer z-10"
  >
    <div className="absolute inset-0 bg-cyan-700 transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 ease-out rounded-lg z-0" />
    <span className="text-white font-medium z-10">{link.platform}</span>
  </a>
))}

      </div>
    </motion.div>
  );
};

export default ProductCard;