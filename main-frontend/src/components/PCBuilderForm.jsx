import React, { useState, useEffect } from "react";
import pcComponents from "../data/pcComponentData";
import "./PCBuilder.css"; // Create this CSS file for animations

const PCBuilderForm = () => {
  const [processor, setProcessor] = useState("");
  const [processorDetails, setProcessorDetails] = useState("");
  const [generation, setGeneration] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [gpu, setGpu] = useState("");
  const [cabinet, setCabinet] = useState("");
  const [fans, setFans] = useState("");
  const [mouse, setMouse] = useState("");
  const [monitor, setMonitor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const calculatePrice = () => {
    setIsCalculating(true);
    setShowPrice(false);
    
    let price = 0;

    // Processor pricing
    if (processor === "Intel" && processorDetails && generation) {
      const genPrice = pcComponents.processors.Intel[processorDetails]?.generations[`${generation} Gen`];
      if (genPrice) price += genPrice;
    } else if (processor === "AMD" && processorDetails) {
      const amdPrice = pcComponents.processors.Ryzen[processorDetails];
      if (amdPrice) price += amdPrice;
    }

    // Keyboard
    price += pcComponents.keyboards[keyboard] || 0;

    // GPU
    const gpuBrand = pcComponents.gpus.NVIDIA[gpu] ? "NVIDIA" : "AMD";
    price += pcComponents.gpus[gpuBrand]?.[gpu] || 0;

    // Cabinet
    if (cabinet) {
      price += pcComponents.cabinets.Standard;
    }

    if (fans === "Air Fans") price += pcComponents.cabinets.Gaming.fans;
    if (fans === "Water Cooler") price += pcComponents.cabinets.Gaming.waterCooling;

    // Mouse
    price += pcComponents.mice[mouse] || 0;

    // Monitor
    if (monitor === "1080p") price += pcComponents.monitors["24 inch 1080p"];
    if (monitor === "1440p") price += pcComponents.monitors["27 inch 1440p"];
    if (monitor === "4k") price += pcComponents.monitors["32 inch 4K"];

    setTotalPrice(price);
    
    // Animation delay
    setTimeout(() => {
      setIsCalculating(false);
      setShowPrice(true);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePrice();
  };

  return (
    <div className="pc-builder-container p-6 bg-black rounded-lg w-full md:w-2/3 mx-auto glow-effect">
      <h1 className="text-4xl text-green-400 text-center mb-8 font-bold tracking-wider animate-pulse">
        GAMING RIG BUILDER
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Processor Dropdown */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">SELECT PROCESSOR</label>
          <select
            value={processor}
            onChange={(e) => {
              setProcessor(e.target.value);
              setProcessorDetails("");
              setGeneration("");
            }}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- CHOOSE YOUR PROCESSOR --</option>
            <option value="Intel">INTEL CORE</option>
            <option value="AMD">AMD RYZEN</option>
          </select>
        </div>

        {/* Processor Details */}
        {processor && (
          <div className="form-group animate-fadeIn">
            <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">PROCESSOR MODEL</label>
            <select
              value={processorDetails}
              onChange={(e) => setProcessorDetails(e.target.value)}
              className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
            >
              <option value="">-- SELECT MODEL --</option>
              {processor === "Intel" &&
                Object.keys(pcComponents.processors.Intel).map((model) => (
                  <option key={model} value={model}>
                    INTEL {model}
                  </option>
                ))}
              {processor === "AMD" &&
                Object.keys(pcComponents.processors.Ryzen).map((model) => (
                  <option key={model} value={model}>
                    RYZEN {model}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Generation Dropdown for Intel */}
        {processor === "Intel" && processorDetails && (
          <div className="form-group animate-fadeIn">
            <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">GENERATION</label>
            <select
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
            >
              <option value="">-- SELECT GEN --</option>
              {Object.keys(pcComponents.processors.Intel[processorDetails].generations).map(
                (gen) => (
                  <option key={gen} value={gen.split(" ")[0]}>
                    {gen.toUpperCase()}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* Keyboard */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">KEYBOARD</label>
          <select
            value={keyboard}
            onChange={(e) => setKeyboard(e.target.value)}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- CHOOSE YOUR KEYBOARD --</option>
            {Object.keys(pcComponents.keyboards).map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* GPU */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">GRAPHICS CARD</label>
          <select
            value={gpu}
            onChange={(e) => setGpu(e.target.value)}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- SELECT GPU --</option>
            {[...Object.entries(pcComponents.gpus.NVIDIA), ...Object.entries(pcComponents.gpus.AMD)].map(
              ([name]) => (
                <option key={name} value={name}>
                  {name.toUpperCase()}
                </option>
              )
            )}
          </select>
        </div>

        {/* Cabinet */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">CABINET</label>
          <select
            value={cabinet}
            onChange={(e) => setCabinet(e.target.value)}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- SELECT CASE --</option>
            <option value="Standard">STANDARD</option>
            <option value="Gaming">GAMING</option>
          </select>
        </div>

        {/* Cooling */}
        {cabinet && (
          <div className="form-group animate-fadeIn">
            <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">COOLING SYSTEM</label>
            <select
              value={fans}
              onChange={(e) => setFans(e.target.value)}
              className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
            >
              <option value="">NONE</option>
              <option value="Air Fans">AIR COOLING</option>
              <option value="Water Cooler">LIQUID COOLING</option>
            </select>
          </div>
        )}

        {/* Mouse */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">GAMING MOUSE</label>
          <select
            value={mouse}
            onChange={(e) => setMouse(e.target.value)}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- SELECT MOUSE --</option>
            {Object.keys(pcComponents.mice).map((m) => (
              <option key={m} value={m}>
                {m.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Monitor */}
        <div className="form-group">
          <label className="block text-green-300 mb-2 text-sm font-mono tracking-wide">DISPLAY</label>
          <select
            value={monitor}
            onChange={(e) => setMonitor(e.target.value)}
            className="w-full p-3 bg-gray-900 text-green-400 rounded-none border-l-4 border-green-500 focus:border-green-400 focus:ring-0 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.01]"
          >
            <option value="">-- SELECT MONITOR --</option>
            <option value="1080p">24" 1080P</option>
            <option value="1440p">27" 1440P</option>
            <option value="4k">32" 4K UHD</option>
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 text-black font-bold tracking-wider rounded-sm hover:from-green-500 hover:to-green-700 hover:text-white transform hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-green-500/50"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <span className="loading-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </span>
            ) : (
              "BUILD YOUR RIG"
            )}
          </button>
        </div>

        {/* Output */}
        {showPrice && (
          <div className="price-display mt-6 animate-priceReveal">
            <div className="text-green-400 text-center text-sm font-mono tracking-widest">
              YOUR GAMING RIG ESTIMATE
            </div>
            <div className="text-green-300 text-center text-4xl font-bold mt-2 price-text">
              ₹{totalPrice.toLocaleString()}
            </div>
            <div className="text-green-500 text-center text-xs mt-2 font-mono tracking-widest">
              * Prices may vary based on availability
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PCBuilderForm;