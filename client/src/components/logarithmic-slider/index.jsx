// LOGARITHMIC-SLIDER

import React from 'react';
import './logarithmic-slider.css';

const LogarithmicSlider = ({
  name,
  value,
  minPosition,
  maxPosition,
  minValue,
  maxValue,
  label,
  onChange,
  className }) => {

  const minV = Math.log(minValue);
  const maxV = Math.log(maxValue);
  const scale = (maxV - minV) / (maxPosition - minPosition);

  function positionToValue(position) {
    return Math.exp(minV + scale * (position - minPosition));
  }

  function valueToPosition(value) {
    return (Math.log(value) - minV) / scale + minPosition;
  }

  function handleChange(event) {
    const value = positionToValue(Number(event.target.value));
    onChange(value);
  }

  return (
    <div className={className}>
      <input
        name={name}
        type="range"
        value={valueToPosition(value)}
        min={minPosition}
        max={maxPosition}
        onChange={handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default LogarithmicSlider;
