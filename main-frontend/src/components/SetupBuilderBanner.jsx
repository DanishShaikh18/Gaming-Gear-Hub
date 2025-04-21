import { Link } from 'react-router-dom';

const SetupBuilderBanner = () => {
  return (
    <section
      className="relative py-16 text-white px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to left, #ff1e56, #000000)',
      }}
    >
      {/* Gaming PNG image */}
      <div className="absolute inset-y-0 right-0 w-[45%] hidden md:block z-0">
        <img
          src="https://geekscallout.co.uk/wp-content/uploads/2020/05/kindpng_1141440.png"
          alt="Gaming PC"
          className="h-full w-full object-contain object-right"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold font-['Rajdhani']">
            Estimate Your Gaming PC Budget 💸
          </h2>
          <p className="text-lg text-gray-200 font-['Rajdhani']">
            Enter the specs you want — from CPU to mousepad — and get an instant cost estimate for building your dream setup!
          </p>
          <Link to="/pc-estimator">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-xl transition duration-300">
              Estimate Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SetupBuilderBanner;
