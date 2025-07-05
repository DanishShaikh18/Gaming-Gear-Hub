import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const mrp = Math.round(product.price * 1.2);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative bg-[#0c0c0c] rounded-2xl p-4 w-full sm:max-w-[350px] mx-auto group overflow-hidden text-white hover:border-2 hover:border-green-400"
    >
      {/* Discount Badge */}
      <div className="absolute top-3 left-3 bg-green-500 text-black font-bold text-sm px-2 py-1 rounded-md z-20">
        20%
      </div>

      {/* Product Image */}
      <div className="relative mb-4 rounded-lg p-2 bg-[#121212]">
        <img
          src={product.image_url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
      </div>

      {/* Product Name with Dynamic Wrapping */}
      <h3
        className={`mb-10 ${
          product.name.length > 250
            ? "text-base leading-snug"
            : "text-xl"
        } font-semibold break-words`}
      >
        {product.name}
      </h3>

      {/* Price Section */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-400 text-2xl font-bold">
          Rs. {product.price.toLocaleString("en-IN")}
        </span>
        <span className="text-gray-500 line-through text-lg">
          Rs. {mrp.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Affiliate Links */}
      <div className="flex flex-col gap-3">
        {product.affiliate_links &&
          product.affiliate_links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex justify-center items-center p-[12px] rounded-lg bg-[#1a1c20] overflow-hidden group/btn cursor-pointer z-10"
            >
              <div className="absolute inset-0 bg-green-500 transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 ease-out rounded-lg z-0" />
              <span className="text-white font-outfit font-thin z-10">
                {link.platform}
              </span>
            </a>
          ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
