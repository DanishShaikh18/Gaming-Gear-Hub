import React from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Navbar from './components/Navbar'
import CategoryGrid from './components/CategoryGrid'
import front_video from './assets/front_video2.mp4'
import TrendingProduct from './components/TrendingProduct'
import BudgetBanner from './components/BudgetBanner'
import BudgetRecommendations from './pages/BudgetRecommendations'
import GameRequirementBanner from './components/GameRequirementBammer'
import GameRequirements from './pages/GameRequirements'
import FeaturedCarousel from './components/FeaturedCarousel'
import Footer from './components/Footer'
// import TopBrandsCarousel from './components/TopBrandsCarousel'

import ProductsPage from './pages/ProductsPage'
import PCBuilderForm from './components/PCBuilderForm'
import SetupBuilderBanner from './components/SetupBuilderBanner'
import PcEstimator from './pages/PcEstimator'
import PopularProducts from './components/PopularProducts'
import SpecialOffer from './components/SpecialOffer'
import ReviewCarousel from './components/ReviewCarousel'
import ScrollRestoration from './components/ScrollRestoration' // ✅

const Home = () => (
  <>
    <div className="relative">
      <FeaturedCarousel />
      <Navbar />
    </div>
    <TrendingProduct />
    <BudgetBanner />
    <CategoryGrid />
    <GameRequirementBanner />
    <PopularProducts />
    <SpecialOffer />
    <SetupBuilderBanner />
    {/* <TopBrandsCarousel /> */}
    <ReviewCarousel />
    <Footer />
  </>
)

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <ScrollRestoration /> {/* ✅ Move here, outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget-recommendations" element={<BudgetRecommendations />} />
        <Route path="/game-requirements" element={<GameRequirements />} />
        <Route path="/products/category/:id" element={<ProductsPage />} />
        <Route path="/pc-estimator" element={<PcEstimator />} />
      </Routes>
    </div>
  )
}

export default App
