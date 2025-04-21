// src/pages/PcEstimator.jsx
import React from 'react';
import PcBuilderForm from '../components/PCBuilderForm'; // assuming this is the existing form component

const PcEstimator = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold font-['Rajdhani'] mb-6 text-center">
        PC Budget Estimator 💻
      </h1>
      <PcBuilderForm />
    </div>
  );
};

export default PcEstimator;
