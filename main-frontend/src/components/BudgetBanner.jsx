import { Link } from 'react-router-dom';

const BudgetBanner = () => {
  return (
    <section
      className="relative py-21 text-white px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #ff416c, #3f5efb)',
      }}
    >
      {/* Background image from right, covers 40-50%, cropped if needed */}
      <div
        className="absolute inset-y-0 right-0 w-[45%] bg-no-repeat bg-right bg-cover z-0"
        style={{
          backgroundImage:
            "url('https://geekscallout.co.uk/wp-content/uploads/2020/05/kindpng_1141440.png')",
        }}
      ></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold font-['Rajdhani']">
            Build Your Dream Gaming Setup 🕹️
          </h2>
          <p className="text-lg text-gray-200 font-['Rajdhani']">
            Choose your budget and get ready-made, expert-picked gaming PC setups tailored to your price range — CPU, GPU, RAM, Monitor, and more!
          </p>
          <Link to="/budget-recommendations">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-xl transition duration-300">
              Explore Setups
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BudgetBanner;
