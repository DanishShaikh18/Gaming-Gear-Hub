import { Link } from 'react-router-dom';
import gameBannerVideo from '../assets/new-new.mp4';

const GameRequirementBanner = () => {
  return (
    <section 
      className="relative text-white px-6 overflow-hidden"
      style={{
        height: '510px' // Set your exact desired height here
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-80"
        src={gameBannerVideo}
      />

      {/* Foreground content - centered vertically */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center max-w-6xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold font-['Rajdhani'] drop-shadow-lg">
          Check Game Requirements 🎮
        </h2>
        <p className="text-lg text-gray-200 font-['Rajdhani'] drop-shadow-md max-w-2xl">
          Enter your favorite game's name and find out the minimum & recommended PC requirements!
        </p>
        <Link to="/game-requirements">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-xl transition duration-300">
            Search Game
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GameRequirementBanner;