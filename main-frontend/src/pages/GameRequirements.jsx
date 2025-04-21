import { useState } from "react";
import { motion } from "framer-motion";
import gameRequirements from "../data/gameRequirements";


const GameRequirements = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      const normalizedQuery = query.trim().toLowerCase();
      const gameKey = Object.keys(gameRequirements).find((game) =>
        game.toLowerCase().includes(normalizedQuery)
      );
      if (!gameKey) {
        setError("Game not found in the database.");
        setResult(null);
      } else {
        setResult({ title: gameKey, data: gameRequirements[gameKey] });
        setError(null);
      }
    }
  };

  const renderSpecs = (specsObj) => {
    return Object.entries(specsObj).map(([key, value]) => (
      <p key={key} className="mb-2">
        <span className="font-semibold text-white">{key}:</span>{" "}
        <span className="text-gray-300">{value}</span>
      </p>
    ));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 z-0"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/e8/0d/f5/e80df5f6ac8f04685e81bf8279dc395d.jpg')`,
        }}
      ></div>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-start px-4 text-white pt-[15vh] pb-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full max-w-2xl"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Enter game name (e.g. 'Cyberpunk 2077')..."
            className="w-full px-6 py-4 rounded-full bg-zinc-800 text-white text-xl 
             focus:outline-none focus:ring-4 focus:ring-red-600 shadow-lg 
             transition-all duration-300 transform hover:scale-105 focus:scale-105"
          />
        </motion.div>

        {error && (
          <div className="mt-10 text-red-400 font-semibold">{error}</div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-zinc-900/90 p-6 rounded-xl shadow-2xl w-full max-w-3xl border border-zinc-700"
          >
            <h2 className="text-3xl font-bold text-red-400 mb-6 text-center tracking-wide">
              {result.title.toUpperCase()}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-green-900/50 to-green-700/30 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-green-500/30 hover:shadow-green-500/40"
              >
                <h3 className="text-xl font-semibold text-green-400 mb-4 underline decoration-green-500">
                  Minimum Requirements
                </h3>
                {renderSpecs(result.data.minimum)}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-purple-900/50 to-purple-700/30 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-purple-500/30 hover:shadow-purple-500/40"
              >
                <h3 className="text-xl font-semibold text-purple-400 mb-4 underline decoration-purple-500">
                  Recommended Requirements
                </h3>
                {renderSpecs(result.data.recommended)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>

    
  );
};

export default GameRequirements;
