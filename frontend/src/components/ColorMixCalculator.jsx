import React, { useState } from 'react';
import {  RotateCcw } from 'lucide-react'; // Remplacez par l'icône appropriée

const ColorMixCalculator = ({ colors }) => {
  const [percentages, setPercentages] = useState(Array(colors.length).fill(0));
  const [totalWeight, setTotalWeight] = useState(500); 

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = parseFloat(value) || 0;
    setPercentages(newPercentages);
  };

  const handleReset = () => {
    setPercentages(Array(colors.length).fill(0));
  };

  const calculateWeights = () => {
    return percentages.map(percentage => (totalWeight * percentage) / 100);
  };

  const totalPercentage = percentages.reduce((acc, curr) => acc + curr, 0);
  const weights = calculateWeights();

  // Combiner les couleurs avec leurs poids pour trier
  const combinedColorsWeights = colors.map((color, index) => ({
    color: color.name,
    weight: weights[index],
  }));

  // Filtrer pour ne garder que les poids > 0
  const filteredColorsWeights = combinedColorsWeights.filter(({ weight }) => weight > 0);

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-md font-bold mb-4">Calculateur de Mélange de Couleurs</h1>

      {totalPercentage >= 100 && (
        <div className="mb-4 p-1 bg-red-500 text-white text-center rounded-md flex justify-center items-center">
          La limite de 100% est atteinte 
          <button 
            onClick={handleReset} 
            className="ml-4 inline-flex items-center px-3 py-1  rounded-full hover:bg-gray-300"
          >
            <RotateCcw className="mr-2" /> 
          </button>
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="totalWeight" className="block text-xs font-medium text-gray-700">
          Poids Total (grammes)
        </label>
        <input
          id="totalWeight"
          type="number"
          value={totalWeight}
          onChange={(e) => setTotalWeight(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-md font-semibold mb-2">Pourcentages des Couleurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {colors.map((color, index) => (
            <div key={index} className="mb-4">
              <label className="block text-xs font-medium text-gray-700">{color.name}</label>
              <input
                type="number"
                value={percentages[index]}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor"
                disabled={totalPercentage >= 100}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-md font-semibold mb-2">Grammage des Couleurs</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b-0">
              <th className="py-2 px-4 bg-primaryColor text-white rounded-tl-lg">Couleur</th>
              <th className="py-2 px-4 bg-primaryColor text-white rounded-tr-lg">Poids (grammes)</th>
            </tr>
          </thead>
          <tbody>
            {filteredColorsWeights.map(({ color, weight }, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{color}</td>
                <td className={`py-2 px-4 border-b`}>{weight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorMixCalculator;
