// FILTER

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFilter } from '../../redux/selectors';
import {
  updateFilterFrequency,
  updateFilterType } from '../../redux/actions/actions-track';
import './filter.css';

import LogarithmicSlider  from '../logarithmic-slider';

const Filter = ({ id, filter, updateFilterType, updateFilterFrequency }) => {

  function handleFrequencyChange(value) {
    updateFilterFrequency({ value, trackId: id });
  }

  function handleFilterTypeChange(event) {
    updateFilterType({ type: event.target.value, trackId: id });
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
      Type:
      <select
        className="button-light filter-type"
        name="filter-type"
        value={filter.type}
        onChange={handleFilterTypeChange}
      >
        <option value="lowpass">low pass</option>
        <option value="highpass">high pass</option>
        <option value="bandpass">band pass</option>
        <option value="notch">notch</option>
      </select>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return { filter: selectFilter(ownProps.id)(state)};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFilterType, updateFilterFrequency }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
