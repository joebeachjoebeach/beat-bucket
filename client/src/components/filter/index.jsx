// FILTER

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFilter } from '../../redux/selectors';
import {
  updateFilterFrequency,
  updateFilterType,
  updateFilterResonance } from '../../redux/actions/actions-track';
import './filter.css';

import LogarithmicSlider  from '../logarithmic-slider';

const Filter = ({
  id,
  filter,
  updateFilterType,
  updateFilterFrequency,
  updateFilterResonance }) => {

  function handleFrequencyChange(value) {
    updateFilterFrequency({ value, trackId: id });
  }

  function handleTypeChange(event) {
    updateFilterType({ type: event.target.value, trackId: id });
  }

  function handleResonanceChange(event) {
    updateFilterResonance({ value: Number(event.target.value), trackId: id });
  }

  return (
    <div className="filter">
      Frequency:
      <LogarithmicSlider
        name="frequency"
        value={filter.frequency}
        minPosition={1}
        maxPosition={200}
        minValue={26}
        maxValue={20000}
        label={`${Math.round(filter.frequency)} Hz`}
        onChange={handleFrequencyChange}
        className="filter-frequency"
        inputClassName="slider track-options-slider-range filter-slider"
      />
      <div className="filter-bottom">
        <div className="filter-bottom-left">
          Type:
          <select
            className="button-light filter-type"
            name="filter-type"
            value={filter.type}
            onChange={handleTypeChange}
          >
            <option value="lowpass">low pass</option>
            <option value="highpass">high pass</option>
            <option value="bandpass">band pass</option>
            <option value="notch">notch</option>
          </select>
        </div>

        <div className="filter-bottom-right">
          Resonance:
          <input
            className="slider track-options-slider-range"
            type="range"
            min={1}
            max={10}
            step={0.1}
            value={filter.resonance}
            onChange={handleResonanceChange}
          />
        </div>

      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return { filter: selectFilter(ownProps.id)(state)};
}

function mapDispatchToProps(dispatch) {
  const actions = { updateFilterType, updateFilterFrequency, updateFilterResonance };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
