import { useState } from 'react';
import { Slider } from 'antd';
import './Slider.css';

const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  setMin,
  setMax,
}: {
  minPrice: number;
  maxPrice: number;
  setMin: (value: number) => void;
  setMax: (value: number) => void;
}) => {
  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleRangeChange = (newRange: any) => {
    setRange(newRange);
    setMin(newRange[0]);
    setMax(newRange[1]);
  };

  return (
    <div className="price-range-slider">
      <span>Cena</span>
      <div className="divCurrentPriceSlider">
        <span>Min: {minPrice}</span>
        <span>Max: {maxPrice}</span>
      </div>
      <Slider
        range
        min={minPrice}
        max={maxPrice}
        defaultValue={[range[0], range[1]]}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default PriceRangeSlider;
