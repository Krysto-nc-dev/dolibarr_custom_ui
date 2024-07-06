import React, { useState } from 'react';

const ColorPicker = () => {
  const [colors, setColors] = useState({
    primaryColor: '#64B5F6',
    secondaryColor: '#6A1B9A',
    accentColor: '#F06292',
    textColor: '#202124',
    backgroundColor: '#F1F3F4',
    highlightColor: '#FFA726',
    mutedColor: '#9E9E9E',
    dangerColor: '#D32F2F',
    warningColor: '#FF8F00',
    successColor: '#388E3C',
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
    <div className="p-6 space-y-6">
      <h2 className="text-md font-bold text-center text-textColor mb-6">Choisissez vos couleurs</h2>
      <div className="space-y-4">
        {Object.keys(colors).map((colorKey) => (
          <div key={colorKey}>
            <label className="block text-sm font-medium text-textColor mb-1 capitalize">
              {colorKey.replace('Color', ' Couleur')}
            </label>
            <input
              type="color"
              name={colorKey}
              value={colors[colorKey]}
              onChange={handleColorChange}
              className="w-full h-10 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
            />
          </div>
        ))}
        <button
          className="w-full py-2 px-4 bg-primaryColor text-white font-semibold rounded-lg shadow-md hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-opacity-75"
          onClick={applyColors}
        >
          Appliquer les couleurs
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
