import ProductCard from '../common/ProductCard';

const FeaturedProducts = () => {
  // Mock data - different from carousel
  const bestsellers = [
    {
      id: 101,
      name: "Razer DeathAdder V3",
      price: 69.99,
      rating: 4.8,
      image: "/products/mouse.jpg",
      isBestSeller: true,
      unitsSold: 1250
    },
    // 5-7 more bestsellers
  ];

  return (
    <section className="py-12 bg-gray-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 font-['Rajdhani']">
          COMMUNITY FAVORITES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              showSalesData={true}  // Special prop for this section
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;