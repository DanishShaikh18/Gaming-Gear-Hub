import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Components/common/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import BuilderPage from './pages/BuilderPage'
import NotFound from './pages/NotFound'
// import Footer from './Components/common/Footer'
import CategoryPage from "./pages/CategoryPage";

// Scroll restoration component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <ScrollToTop />
      
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:categoryName" element={<CategoryPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default App