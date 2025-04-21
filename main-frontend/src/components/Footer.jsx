import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-tr from-zinc-900 via-black to-zinc-900 text-white py-12 px-6 mt-15 border-t border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6"
      >
        {/* Upper text aligned to the center */}
        <div className="text-zinc-400 text-lg mb-4 space-y-2 text-center hover:text-white hover:scale-110 transition-all duration-300 ease-in-out">
          <p>Connecting Gamers Worldwide 🌍</p>
          <p>Your #1 Source for Gaming Gear & Accessories</p>
        </div>

        {/* Social media icons centered below */}
        <div className="flex gap-8 text-3xl mb-6 justify-center">
          <a
            href="#"
            className="text-zinc-400 hover:text-[#E1306C] transition duration-300 transform hover:scale-125"  // Instagram color
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-zinc-400 hover:text-blue-500 transition duration-300 transform hover:scale-125"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-zinc-400 hover:text-indigo-500 transition duration-300 transform hover:scale-125"
          >
            <i className="fab fa-discord"></i>
          </a>
        </div>

        {/* Bottom text */}
        <p className="text-zinc-400 text-sm text-center hover:text-white transition duration-300 ease-in-out">
          © {new Date().getFullYear()} Gaming Gear Hub. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
