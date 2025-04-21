import { Link } from 'react-router-dom';
import gameBannerVideo from '../assets/game-banner.mp4';

const GameRequirementBanner = () => {
  return (
    <section className="relative py-24 text-white px-6 overflow-hidden">
      {/* Background Video */}
      <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top z-0 opacity-80"
          src={gameBannerVideo}
      />


      {/* Foreground content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-start justify-center h-full space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold font-['Rajdhani'] drop-shadow-lg">
          Check Game Requirements 🎮
        </h2>
        <p className="text-lg text-gray-200 font-['Rajdhani'] drop-shadow-md">
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
