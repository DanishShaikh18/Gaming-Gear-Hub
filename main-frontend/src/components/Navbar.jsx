import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false)
  const [showTools, setShowTools] = useState(false)
  let timerCat, timerTool

  const handleCatEnter = () => {
    clearTimeout(timerCat)
    setShowCategories(true)
  }

  const handleCatLeave = () => {
    timerCat = setTimeout(() => setShowCategories(false), 300)
  }

  const handleToolEnter = () => {
    clearTimeout(timerTool)
    setShowTools(true)
  }

  const handleToolLeave = () => {
    timerTool = setTimeout(() => setShowTools(false), 300)
  }

  const categories = [
    { id: 1, name: 'Keyboards' },
    { id: 2, name: 'Mice' },
    { id: 3, name: 'Headsets' },
    { id: 4, name: 'Monitors' },
    { id: 5, name: 'Controller' }
  ]

  const tools = [
    { name: 'Budget Builder', path: '/budget-recommendations' },
    { name: 'Game Requirements', path: '/game-requirements' },
    { name: 'Estimate PC Budget', path: '/pc-estimator' }
  ]

  return (
    <nav className="absolute top-0 left-0 w-full px-10 h-24 flex items-center justify-between z-50">
      {/* Logo */}
      <Link to="/" className="text-4xl font-extrabold text-white tracking-wide">
        <span className="text-[#5FD522]">Gaming</span>-Gear Hub
      </Link>

      {/* Mid + Right section */}
      <div className="flex items-center gap-16  ml-auto mr-[40%]">
        {/* Categories dropdown */}
        <div
          className="relative"
          onMouseEnter={handleCatEnter}
          onMouseLeave={handleCatLeave}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white text-xl font-semibold flex items-center gap-2 hover:text-[#5FD522] transition-all duration-300"
          >
            <span>Categories</span>
            <motion.div
              animate={{ rotate: showCategories ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>

          {showCategories && (
            <ul className="absolute flex flex-col bg-zinc-900 mt-2 rounded-md shadow-lg z-50 min-w-[200px]">
              {categories.map(({ id, name }) => (
                <Link
                  key={id}
                  to={`/products/category/${id}`}
                  className="px-5 py-3 text-white text-lg hover:text-[#5FD522] hover:scale-105 transition-all duration-300"
                >
                  {name}
                </Link>
              ))}
            </ul>
          )}
        </div>

        {/* Tools dropdown */}
        <div
          className="relative"
          onMouseEnter={handleToolEnter}
          onMouseLeave={handleToolLeave}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white text-xl font-semibold flex items-center gap-2 hover:text-[#5FD522] transition-all duration-300"
          >
            <span>Tools</span>
            <motion.div
              animate={{ rotate: showTools ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>

          {showTools && (
            <ul className="absolute flex flex-col bg-zinc-900 mt-2 rounded-md shadow-lg z-50 min-w-[220px]">
              {tools.map(({ name, path }, index) => (
                <Link
                  key={index}
                  to={path}
                  className="px-5 py-3 text-white text-lg hover:text-[#5FD522] hover:scale-105 transition-all duration-300"
                >
                  {name}
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
