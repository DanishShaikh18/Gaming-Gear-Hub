import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
const Home = () => (
  <>
    {/* <Navbar /> */}
    {/* <video
      src={front_video}
      autoPlay
      loop
      muted
      className="w-full h-[80vh] object-cover"
    /> */}
    {/* <FeaturedCarousel/> */}

    <div className="relative">
      <FeaturedCarousel />
      <Navbar />
    </div>


    <TrendingProduct />
    <SetupBuilderBanner/>
    <CategoryGrid />
    <BudgetBanner />
    {/* <TopBrandsCarousel></TopBrandsCarousel> */}
    <GameRequirementBanner/>
      <Footer/>
    
  </>
)

const App = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
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
