import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef } from "react";

const brands = [
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
  { name: "Redgear", image: "https://redgeargaming.com/cdn/shop/files/Redgear_Logo_Header_dc04a35a-1388-4503-ae1f-95bcdf2a8e6b_500x.png?v=1646988452" },
];

const TopBrandsCarousel = () => {
  const sliderRef = useRef(null);

  const [sliderInstance] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    slides: {
      perView: 4,
      spacing: 16,
    },
    drag: false,
  });

  useEffect(() => {
    let interval;
    if (sliderInstance) {
      interval = setInterval(() => {
        sliderInstance.current?.next();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [sliderInstance]);

  return (
    <div className="w-full bg-black py-10 px-4">
      <h2 className="text-white text-2xl font-semibold mb-6 text-center">Top Brands</h2>
      <div ref={sliderRef} className="keen-slider">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="keen-slider__slide bg-zinc-900 hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden shadow-lg cursor-pointer p-4 flex flex-col items-center justify-center"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-20 object-contain mb-3"
            />
            <span className="text-white text-sm">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrandsCarousel;
