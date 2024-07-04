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
    <div>
      <h2>Choisissez vos couleurs</h2>
      <div>
        <label>Soft Blue:</label>
        <input
          type="color"
          name="softBlue"
          value={colors.softBlue}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label>Soft Red:</label>
        <input
          type="color"
          name="softRed"
          value={colors.softRed}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label>Grayish Blue:</label>
        <input
          type="color"
          name="grayishBlue"
          value={colors.grayishBlue}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label>Very Dark Blue:</label>
        <input
          type="color"
          name="veryDarkBlue"
          value={colors.veryDarkBlue}
          onChange={handleColorChange}
        />
      </div>
      <button onClick={applyColors}>Appliquer les couleurs</button>
    </div>
  );
};

export default ColorPicker;