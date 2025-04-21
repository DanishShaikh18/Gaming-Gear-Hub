const Hero = () => {
    return (
      <section className="relative bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build Your <span className="text-purple-500">Ultimate</span> Gaming Setup
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Discover the best gear tailored for your budget and play style.
            </p>
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-all hover:scale-105">
              Start Building
            </button>
          </div>
  
          {/* Placeholder for Image/Animation */}
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 bg-purple-900/30 rounded-full flex items-center justify-center border-2 border-purple-500/50">
              <span className="text-gray-400">Gaming Gear Hub Image</span>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;