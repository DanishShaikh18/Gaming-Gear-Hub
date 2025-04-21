const CategoryCard = ({ category, onClick }) => {
  return (
    <div 
      onClick={() => onClick(category.id)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img 
        src={category.image_url} 
        alt={category.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
