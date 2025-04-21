import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BuilderPromo = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-900/30 to-cyan-900/20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Rajdhani']">
            CAN'T DECIDE? WE'LL BUILD IT FOR YOU
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our smart builder creates the perfect setup tailored to your budget and gaming needs
          </p>
          <Link 
            to="/builder"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
          >
            START BUILDING →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-gray-700 pt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰', 
                title: "Set Your Budget",
                text: "From $1000 to $5000+"
              },
              {
                icon: '🎮', 
                title: "Choose Priorities",
                text: "Focus on GPU, aesthetics, etc."
              },
              {
                icon: '🚀', 
                title: "Get Recommendations",
                text: "Optimized part list"
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuilderPromo;