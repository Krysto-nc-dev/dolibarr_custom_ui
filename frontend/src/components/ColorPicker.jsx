import React, { useState } from 'react';

const ColorPicker = () => {
  const [colors, setColors] = useState({
    softBlue: '#6B83E8',
    softRed: '#E84141',
    grayishBlue: '#8A99B2',
    veryDarkBlue: '#2D3E58',
  });

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setColors((prevColors) => ({
      ...prevColors,
      [name]: value,
    }));
  };

  const applyColors = () => {
    Object.keys(colors).forEach((color) => {
      document.documentElement.style.setProperty(`--${color}`, colors[color]);
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-veryDarkBlue mb-6">Choisissez vos couleurs</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-grayishBlue mb-1">Soft Blue:</label>
          <input
            type="color"
            name="softBlue"
            value={colors.softBlue}
            onChange={handleColorChange}
            className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-softBlue focus:border-softBlue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-grayishBlue mb-1">Soft Red:</label>
          <input
            type="color"
            name="softRed"
            value={colors.softRed}
            onChange={handleColorChange}
            className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-softRed focus:border-softRed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-grayishBlue mb-1">Grayish Blue:</label>
          <input
            type="color"
            name="grayishBlue"
            value={colors.grayishBlue}
            onChange={handleColorChange}
            className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-grayishBlue focus:border-grayishBlue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-grayishBlue mb-1">Very Dark Blue:</label>
          <input
            type="color"
            name="veryDarkBlue"
            value={colors.veryDarkBlue}
            onChange={handleColorChange}
            className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-veryDarkBlue focus:border-veryDarkBlue"
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-softBlue text-white font-semibold rounded-lg shadow-md hover:bg-softBlue-dark focus:outline-none focus:ring-2 focus:ring-softBlue focus:ring-opacity-75"
          onClick={applyColors}
        >
          Appliquer les couleurs
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
