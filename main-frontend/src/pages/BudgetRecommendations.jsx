import React, { useState } from 'react'
import { setupsData } from '../data/BudgetSetupsData'  // Importing data from data.js

const BudgetRecommendations = () => {
  const [selectedBudget, setSelectedBudget] = useState(null)

  const budgetOptions = [
    { id: 1, label: '₹50,000', key: '₹50,000' },
    { id: 2, label: '₹1,00,000', key: '₹1,00,000' },
    { id: 3, label: '₹2,00,000', key: '₹2,00,000' },
    { id: 4, label: '₹3,00,000', key: '₹3,00,000' },
    { id: 5, label: '₹5,00,000+', key: '₹5,00,000+' },
  ]

  const handleBudgetClick = (budgetKey) => {
    setSelectedBudget(setupsData[budgetKey])
  }

  return (
    <div className="py-16 bg-gray-800 text-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Choose Your Budget</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {budgetOptions.map((option) => (
            <div
              key={option.id}
              className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleBudgetClick(option.key)} // Pass key to fetch setups
            >
              <h3 className="text-2xl font-bold">{option.label}</h3>
              <p className="text-lg mt-4">Click to see setups</p>
            </div>
          ))}
        </div>

        {selectedBudget && (
          <div className="mt-12">
            <h3 className="text-3xl font-bold mb-4">Recommended Setups for {selectedBudget[0]?.price ? `₹${selectedBudget[0].price}` : ''}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {selectedBudget.map((setup) => (
                <div key={setup.id} className="bg-gray-700 p-6 rounded-xl shadow-lg">
                  <h4 className="text-xl font-bold mb-4">{setup.name}</h4>
                  <ul className="space-y-2">
                    <li><strong>CPU:</strong> {setup.components.cpu}</li>
                    <li><strong>GPU:</strong> {setup.components.gpu}</li>
                    <li><strong>RAM:</strong> {setup.components.ram}</li>
                    <li><strong>Storage:</strong> {setup.components.storage}</li>
                    <li><strong>Monitor:</strong> {setup.components.monitor}</li>
                  </ul>
                  <p className="mt-4 text-lg font-bold">Price: ₹{setup.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetRecommendations
