import React, { useState } from "react";

const products = [
  {
    name: "KD DMTR Gaming...",
    price: "Rs. 15,999",
    image: "https://gaming-workdo.myshopify.com/cdn/shop/products/nx2-backside-handleup-1000-removebg-preview.png?v=1671452014",
    link: "https://www.amazon.in/KandE-Gaming-Desktop-Intel-i5-6500/dp/B0BQC2QRXP",
  },
  {
    name: "Raptor Gameing Z95",
    price: "Rs. 25,000 ",
    image: "https://velocitymicro.com/img/PC/SX3/1000/SX3_angle_1000_v2.png",
    link: "https://velocitymicro.com/raptor-z95-gaming-pc.php",
  },
  {
    name: "Electrobot Xtreme 1",
    price: "Rs. 15,468",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/7/DW/TV/JJ/8612162/high-end-desktop-gaming-editing-pc-500x500.png",
    link: "https://www.amazon.in/Electrobot-Xtreme-Gaming-PC-Chipset/dp/B0BJ7FHR3S",
  },
];


const PopularProducts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDotClick = (index) => {
    setCurrentPage(index);
  };

  // Calculate the transform value based on current page
  const transformValue = `translateX(-${currentPage * (100 / itemsPerPage)}%)`;

  return (
    <section className="bg-[#0d0f10] text-white py-20">
      <div className="max-w-8xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-lime-400 mb-14 text-center">
          Our Popular Products
        </h2>

        <div className="overflow-hidden relative">
          <div 
            className="w-full"
            style={{
              overflow: "hidden",
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalPages * 100}%`,
                transform: transformValue,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={pageIndex}
                  className="w-full flex"
                  style={{
                    width: `${100 / totalPages}%`,
                  }}
                >
                  {products.slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  ).map((product, index) => (
                    <div
                      key={index}
                      className="bg-[#151718] p-8 rounded-2xl shadow-xl flex justify-between items-center h-[400px] mx-2 flex-shrink-0"
                      style={{
                        width: `calc(${100 / itemsPerPage}% - 1rem)`,
                      }}
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-3xl font-semibold mb-2">{product.name}</h3>
                        <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                        <p className="text-lime-400 text-2xl mb-6">{product.price}</p>
                        <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg text-xl inline-block"
                          >
                            Buy Now
                          </a>

                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-56 h-auto object-contain ml-6"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-6 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentPage ? "bg-lime-500" : "bg-white"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;