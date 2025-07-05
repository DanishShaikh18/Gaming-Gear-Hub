import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaXTwitter, FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-white py-24 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-lime-400 mb-2">GAMING</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Discover our phone cases designed for a perfect grip, reducing the risk of accidental drops.
          </p>
          <div className="flex border border-lime-500 rounded-md overflow-hidden max-w-sm">
            <input
              type="email"
              placeholder="Enter email address..."
              className="bg-black text-white px-3 py-2 w-full outline-none"
            />
            <button className="bg-lime-500 text-black px-4 py-2 font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-3">About Us</h3>
          <p className="text-sm text-zinc-300">
            Gaming-Gear Hub is your go-to affiliate platform for top-rated gaming accessories. From game requirement finders to custom budget PC builders, we help you build the perfect setup with product links from trusted stores.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li>📞 +91 98765 43210</li>
            <li>📞 +91 91234 56789</li>
            <li>📧 gaminggearhub@gmail.com</li>
            <li>📧 support.gghub@gmail.com</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lime-400 font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#"><FaFacebookF className="hover:text-lime-400 transition" /></a>
            <a href="#"><FaInstagram className="hover:text-lime-400 transition" /></a>
            <a href="#"><FaYoutube className="hover:text-lime-400 transition" /></a>
            <a href="#"><FaPinterestP className="hover:text-lime-400 transition" /></a>
            <a href="#"><FaXTwitter className="hover:text-lime-400 transition" /></a>
          </div>
        </div>
      </motion.div>

      {/* Floating Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-lime-500 text-black p-3 rounded-full shadow-lg hover:scale-110 transition-all"
      >
        <FaArrowUp />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
