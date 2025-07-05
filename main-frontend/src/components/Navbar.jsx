import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import png from '../assets/png.png'

const Navbar = () => {
  const [showProducts, setShowProducts] = useState(false)
  const [showTools, setShowTools] = useState(false)
  let timerProd, timerTool

  const handleProdEnter = () => {
    clearTimeout(timerProd)
    setShowProducts(true)
  }

  const handleProdLeave = () => {
    timerProd = setTimeout(() => setShowProducts(false), 300)
  }

  const handleToolEnter = () => {
    clearTimeout(timerTool)
    setShowTools(true)
  }

  const handleToolLeave = () => {
    timerTool = setTimeout(() => setShowTools(false), 300)
  }

  const products = [
    { id: 1, name: 'Keyboards', image: 'https://www.pngarts.com/files/4/Gaming-Keyboard-PNG-High-Quality-Image.png' },

    { id: 2, name: 'Mouse', image: 'https://s3-alpha-sig.figma.com/img/4cd0/9699/941dbe4fb355c648e65b2b10df797ae2?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EOyNKqYnPIXKXhQyBXddqyvtis4-GriQZiydHz3iEJdq7Tr7l6EI-kej1YC8zh-6mYTFOOHjt78aUZfrv7W1oQgVaySlB53ESXQT~yOEcDU9a1DiLoMYX1J0ZUyLB7MZHpc8aeKxfbSnl5NUUQIV9g-L4~3XYHMtnjmXokFy5twBHKkSxI3SFF4Jjuwkgxc17duQfPrLavWSweaPACaT23tlGEZ61dLwKTT6iijnc25pP0reJeZBWIKcphoSVFsxUn7Jz-4BhVhGDVx8CBX~DUCWFRrgsd27JtSy6J~~UpIDxFLhPYeiPe-LfwvP10Pb~PGmQb8Oqv2B~dWNejDgew__' },

    { id: 3, name: 'Headset', image: 'https://s3-alpha-sig.figma.com/img/6e16/4256/0298400ded716741a6fb9b2f15d9fe96?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oh59vGw~bekrFDkHj9-St8Ow06a4SqDN8WyiSL5mz9YeVe-KAZMxsMvvy0R0jat9MI5XOnfC1zzpvk~0QGdXzMQuVmnKMf0Y1LGgqfnTNOyEXIB8YmwgqvMCuY9zCzfQ2XxEYcvWinDr7ag0CJc0i9pB6vJi4eCaVBX4YenKbzBV64P85DBts8uQVjitkYNbERITwz4JlcP6XWbnKSPn4lJ03mDRZ38DLNNF9pJtWmI8cJWZijvehoebAYrtcM0h~VneP0fsGOTCKQMxTdPBlqkF~u8ktPTJBj-NrSsT4g~J362wl1Ay7AysJ0SlUDkSgFhIafRnrCumBQVtGG6Bdg__' },

    { id: 4, name: 'Monitor', image: 'https://s3-alpha-sig.figma.com/img/4155/2b35/5ea6ce69876acd4a219c275e056d4f06?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TaF-4UHp~Y00ux3QFzPn510oo3OD8EjMP5PKyg~SANVun-Emdn6tyMaJJhgC7VtLfsgIiF54YQIWaL~XzPvOfantIE6RuHZto7~sEMcZ-MA1klajnJpPI-pKZMCl7zHhk~31qwuWtu70i1EKHK8InUli43byhXQCyJ3HMVvcFazDYoa2Zd5oZOcfJ-~DimopdVBT-utRI~y1zQpcXqUFSOJYak2oJ7AudBS0GCZ8eGkhxb7TDctxG5cFy0hGYRNd18fGTAxWhXCYEKETxUNjyv2azUuTjmnFuV5cLceu98b4AqBqt2F3X2AWpgr155Zb2Uf438EFgB9ORa0BjHnNUA__' },

    // { id: 5, name: 'Controller', image: 'https://s3-alpha-sig.figma.com/img/8e1d/6e9b/8c744cb194ac87ae703d27eccf7daf3e?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jdekY4eYNiIbQBvNEZbGmedvyxozP0bygSusIuP~K6xR~b8rVvT27al9sWInB-yzFD6OBA2~SwlUyCTsShwR8RQTQYvyDfHlNvtQCz1GKqYXh8-Sd4PxQUd2kLoJwSNw8emekR6bmh9xrKoptQhVX8m3wz8lVQAXl7NTiuK-QpyDk2~fuxAOc23ayU8J-C1O0e6glXRYTQZDOqAMA8j94c0ktCP7dBR9cWPxH8NylKyLPMBtee-3aH8Kl6VjIsNXpeRcxQARsZdCZGuXllwNoKz5AjsmuugEJnaSjwy1rF8uIelBztqFqA0et-66nlt1PfYbiJjDfuodkYq2Cq43og__' }
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
      <div className="flex items-center gap-16 ml-auto mr-[40%]">
        {/* Products dropdown */}
        <div
          className="relative"
          onMouseEnter={handleProdEnter}
          onMouseLeave={handleProdLeave}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white text-xl font-semibold flex items-center gap-2 hover:text-[#5FD522] transition-all duration-300"
          >
            <span>Products</span>
            <motion.div
              animate={{ rotate: showProducts ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>

          {showProducts && (
            <div className="fixed left-0 top-24 w-full backdrop-blur-xl bg-green-500/30 py-4 px-14 z-40 shadow-2xl ">
              <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
                {products.map(({ id, name, image }) => (
                  <Link
                    to={`/products/category/${id}`}
                    key={id}
                    className="group rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-60 object-contain rounded-xl transition-all duration-300"
                    />
                    <div className="text-white text-xl font-semibold text-center mt-2">
                      {name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
    <div className="fixed left-0 top-24 w-full px-14 py-8 bg-green-900/20 backdrop-blur-3xl z-40 shadow-2xl">
    <h2 className="text-white text-3xl font-bold mb-6 text-center">Gear Up Tools</h2>
    <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
      {[
        {
          name: "Setup Builder",
          image: "https://static.vecteezy.com/system/resources/thumbnails/035/930/086/small_2x/ai-generated-gaming-desk-isolated-on-transparent-background-ai-png.png",
          path: "/budget-recommendations"
        },
        {
          name: "Performance Match",
          image: "https://s3-alpha-sig.figma.com/img/2c26/4aa3/69303923f6f06491a6c2cd68a9e37fc0?Expires=1746403200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bWw24Q2m8ESmnMJO5Hf278dP9GGerpX7Xf2pt8dkMa4MfMAvwODJEwIjZhlChmNAY1j2xnN4PmJRnNZfxyFkISXVoW6c8JtFM1lB~imx9Kuv8xPLQi9Eyi~FaQpKfaSkdaWnLQ~M-iYxz0xN8zPggjPeZc48Ce7q5gQk8Bt6KsHjEEK3vUQihsm2-1xNccvmNjOOiI3FvXt6RvppEHouh~VhW8CozLeY~6~QNRTIZmelAoINxxB87zU1hYr4UeT3IGJ9uKj65Nd0zjQEM99RxJ2cjsrgJmBcxW5opZNB6uzn4WQKa4HT-mntodDLMKBQ7g1P06CjiHJICy8CWaDrMw__",
          path: "/pc-estimator"
        },
        {
          name: "Game Requirements",
          image: png,
          path: "/game-requirements"
        },
      ].map(({ name, image, path }, idx) => (
        <Link
          key={idx}
          to={path}
          className="  p-4 rounded-xl text-white text-center hover:scale-105 transition-transform duration-300"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-50 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold mt-2">{name}</h3>
        </Link>
      ))}
    </div>
  </div>
  
  )}
</div>

      </div>
    </nav>
  )
}

export default Navbar
