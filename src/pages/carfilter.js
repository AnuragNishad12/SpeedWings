import React, { useState } from 'react';
import './carfilter.css';  // Ensure you create and link a CSS file for styling

function CarFilters({ onFilterChange }) {
  const [sortPrice, setSortPrice] = useState('');
  const [carStyle, setCarStyle] = useState([]);
  const [carBrand, setCarBrand] = useState('');

  const handleSortChange = (e) => {
    setSortPrice(e.target.value);
    onFilterChange({ sortPrice: e.target.value, carStyle, carBrand });
  };

  const handleStyleChange = (style) => {
    const updatedStyles = carStyle.includes(style)
      ? carStyle.filter(s => s !== style)
      : [...carStyle, style];
    setCarStyle(updatedStyles);
    onFilterChange({ sortPrice, carStyle: updatedStyles, carBrand });
  };

  const handleBrandChange = (e) => {
    setCarBrand(e.target.value);
    onFilterChange({ sortPrice, carStyle, carBrand: e.target.value });
  };

  return (
    <div className="car-filters">
      <h2>Car Filters</h2>
      <hr />
      
      <div className="filter-group">
        <label>Sort by Price</label>
        <select value={sortPrice} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>
      <hr />
      <div className="filter-group">
        <h3>Car Style</h3>
        <hr />
        {['Luxury', 'Super Car', 'Sport Car', 'Premium'].map(style => (
          <div key={style} className="checkbox-group">
            <input
              type="checkbox"
              id={style}
              checked={carStyle.includes(style)}
              onChange={() => handleStyleChange(style)}
            />
            <label htmlFor={style}>{style}</label>
          </div>
        ))}
      </div>
        <hr />
      <div className="filter-group">
        <h3>Car Brand</h3>
        <hr />
        <select value={carBrand} onChange={handleBrandChange}>
          <option value="">Select Brand</option>
          <option value="brand-a">Brand A</option>
          <option value="brand-b">Brand B</option>
          {/* Add more brands as needed */}
        </select>
      </div>
    </div>
  );
}

export default CarFilters;
