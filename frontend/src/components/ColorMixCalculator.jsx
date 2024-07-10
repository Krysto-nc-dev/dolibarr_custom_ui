import React, { useState } from 'react';
import { ChefHat, OctagonX, RotateCcw, SaveAll } from 'lucide-react';

const ColorMixCalculator = ({ colors }) => {
  const [percentages, setPercentages] = useState(Array(colors.length).fill(0));
  const [weights, setWeights] = useState(Array(colors.length).fill(0));
  const [totalWeight, setTotalWeight] = useState(500); 
  const [isPercentageMode, setIsPercentageMode] = useState(true);

  const handlePercentageChange = (index, value) => {
    const newPercentages = [...percentages];
    newPercentages[index] = Math.max(0, parseFloat(value)) || 0;
    setPercentages(newPercentages);
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = Math.max(0, parseFloat(value)) || 0;
    setWeights(newWeights);
  };

  const handleReset = () => {
    setPercentages(Array(colors.length).fill(0));
    setWeights(Array(colors.length).fill(0));
  };

  const calculateWeights = () => {
    return percentages.map(percentage => (totalWeight * percentage) / 100);
  };

  const calculatePercentages = () => {
    const total = weights.reduce((acc, curr) => acc + curr, 0);
    return weights.map(weight => (weight / totalWeight) * 100);
  };

  const totalPercentage = percentages.reduce((acc, curr) => acc + curr, 0);
  const totalWeightInGrams = weights.reduce((acc, curr) => acc + curr, 0);
  const calculatedWeights = calculateWeights();

  const combinedColorsWeights = colors.map((color, index) => ({
    color: color.name,
    weight: isPercentageMode ? calculatedWeights[index] : weights[index],
    percentage: isPercentageMode ? percentages[index] : (weights[index] / totalWeight) * 100,
  }));

  const filteredColorsWeights = combinedColorsWeights.filter(({ weight }) => weight > 0);

  const toggleMode = () => {
    if (isPercentageMode) {
      setWeights(calculateWeights());
    } else {
      setPercentages(calculatePercentages());
    }
    handleReset();
    setIsPercentageMode(!isPercentageMode);
  };

  const handleSaveRecipe = () => {
    // Logic to save the recipe
    alert('Recette enregistrée !');
  };

  return (
    <div className="p-6 max-w-9xl mx-auto rounded-lg shadow-md">
      <h1 className="text-md font-bold mb-4">Calculateur de Mélange de Couleurs</h1>

      {totalPercentage >= 100 && isPercentageMode && (
        <div className='flex items-center justify-between' >
        <div className="mb-4 p-1 bg-green-500 text-white text-center rounded-md flex justify-center items-center">
        <ChefHat strokeWidth={2.25} className='mr-3'/>   Recette terminée ! Ready to cook !
          <button 
            onClick={handleReset} 
            className=" inline-flex items-center  py-1 rounded-full hover:text-red-700"
            >
            <OctagonX strokeWidth={1.5}  className="ml-2" /> 
          </button>
         
        </div>
        <button 
            onClick={handleSaveRecipe} 
            className=" inline-flex items-center px-3 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
           <SaveAll strokeWidth={1.5}className='mr-3'  />   Enregistrer
          </button>
            </div >
      )}

      {totalWeightInGrams >= totalWeight && !isPercentageMode && (
        <div className='flex items-center justify-between' >
        <div className="mb-4 p-1 bg-green-500 text-white text-center rounded-md flex justify-center items-center">
        <ChefHat strokeWidth={2.25} className='mr-3'/>   Recette terminée ! Ready to cook !
          <button 
            onClick={handleReset} 
            className=" inline-flex items-center  py-1 rounded-full text-red-700"
            >
            <OctagonX strokeWidth={1.5}  className="ml-2" /> 
          </button>
         
        </div>
        <button 
            onClick={handleSaveRecipe} 
            className=" inline-flex items-center px-3 py-3 bg-gray-200 text-white rounded-full hover:bg-blue-600"
          >
           <SaveAll strokeWidth={1.5}className='mr-3'  />  Enregistrer 
          </button>
            </div >
      )}
      <div className='flex justify-between items-center'>

      <div className="mb-4">
        <label htmlFor="totalWeight" className="block text-xs font-medium ">
          Poids Total (grammes)
        </label>
        <input
          id="totalWeight"
          type="number"
          value={totalWeight}
          onChange={(e) => setTotalWeight(Math.max(0, parseFloat(e.target.value)))}
          className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor "
          />
      </div>

      <div className="mb-4 flex justify-between items-center">
      
        <button 
          onClick={toggleMode} 
          className="ml-4 inline-flex items-center px-10 max-w-10xl py-3 bg-primaryColor text-sm rounded-full hover:bg-secondaryColor "
          >
          <RotateCcw className="mr-2 h-5" /> 
          {isPercentageMode ? 'Entrer par Grammes' : 'Entrer par Pourcentages'}
        </button>
      </div>
      
          </div>
          <h2 className="text-md font-semibold mb-2">
          {isPercentageMode ? 'Pourcentages des Couleurs' : 'Grammages des Couleurs'}
        </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="mb-4">
            <label className="block text-xs font-medium ">{color.name}</label>
            <input
              type="number"
              value={isPercentageMode ? percentages[index] : weights[index]}
              onChange={(e) => isPercentageMode ? handlePercentageChange(index, e.target.value) : handleWeightChange(index, e.target.value)}
              className={`mt-1 block w-full p-2 border text-gray-700 ${((isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primaryColor focus:border-primaryColor`}
              disabled={(isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)}
            />
            {((isPercentageMode && totalPercentage >= 100) || (!isPercentageMode && totalWeightInGrams >= totalWeight)) && (
              <p className="text-xs text-red-500 mt-1">Vous avez atteint la limite</p>
            )}
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-md font-semibold mb-2">{isPercentageMode ? 'Grammage des Couleurs' : 'Pourcentage des Couleurs'}</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b-0">
              <th className="py-2 px-4 bg-primaryColor text-gray-700 ">Couleur</th>
              <th className="py-2 px-4 bg-primaryColor text-gray-700 ">{isPercentageMode ? 'Poids (grammes)' : 'Pourcentage (%)'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredColorsWeights.map(({ color, weight, percentage }, index) => (
              <tr key={index} className='bg-gray-700 hover:bg-gray-500'>
                <td className="py-2 px-4 border-b">{color}</td>
                <td className={`py-2 px-4 border-b`}>{isPercentageMode ? weight.toFixed(2) : percentage.toFixed(2)} {isPercentageMode ? 'g' : '%'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorMixCalculator;
