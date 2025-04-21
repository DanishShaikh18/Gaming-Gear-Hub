const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md text-white">
      <img src={product.image_url || "https://via.placeholder.com/300x200"} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
    </div>
  );
};

export default ProductCard;
