// TRACK-OPTIONS

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEnvelope } from '../../redux/selectors';
import {
  updateAttack,
  updateDecay,
  updateSustain,
  updateRelease } from '../../redux/actions/actions-track';

import './track-options.css';

import SawtoothSVG from '../svg/sawtooth-svg';
import SineSVG from '../svg/sine-svg';
import TriangleSVG from '../svg/triangle-svg';
import SquareSVG from '../svg/square-svg';

const TrackOptionsSlider = ({ text, ...restProps }) => {
  return (
    <div className="track-options-slider">
      <label className="track-options-slider-label">{text}</label>
      <input
        className="slider track-options-slider-range"
        type="range"
        { ...restProps }
      />
    </div>
  );
};

const TrackOptions = ({
  id,
  envelope,
  updateAttack,
  updateDecay,
  updateSustain,
  updateRelease }) => {

  function handleAttackChange(event) {
    updateAttack({ value: Number(event.target.value), trackId: id });
  }

  function handleDecayChange(event) {
    updateDecay({ value: Number(event.target.value), trackId: id });
  }

  function handleSustainChange(event) {
    updateSustain({ value: Number(event.target.value), trackId: id });
  }

  function handleReleaseChange(event) {
    updateRelease({ value: Number(event.target.value), trackId: id });
  }

  return (
    <div className="track-options">
      <div className="track-options-left">
        Envelope:
        <TrackOptionsSlider
          text="Attack"
          min="0.001"
          max="2"
          step="0.01"
          value={envelope.attack}
          onChange={handleAttackChange}
        />
        <TrackOptionsSlider
          text="Decay"
          min="0"
          max="3"
          step="0.01"
          value={envelope.decay}
          onChange={handleDecayChange}
        />
        <TrackOptionsSlider
          text="Sustain"
          min="0"
          max="1"
          step="0.01"
          value={envelope.sustain}
          onChange={handleSustainChange}
        />
        <TrackOptionsSlider
          text="Release"
          min="0.001"
          max="10"
          step="0.01"
          value={envelope.release}
          onChange={handleReleaseChange}
        />
      </div>
      <div className="track-options-right">
        Oscillator:
        <div className="track-options-oscillator-buttons">
          <button className="button-light oscillator-button">
            <SineSVG className="wave-svg" />
          </button>
          <button className="button-light oscillator-button">
            <TriangleSVG className="wave-svg" />
          </button>
          <button className="button-light oscillator-button">
            <SawtoothSVG className="wave-svg" />
          </button>
          <button className="button-light oscillator-button">
            <SquareSVG className="wave-svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, { id }) {
  return { envelope: selectEnvelope(id)(state) };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateAttack,
    updateDecay,
    updateSustain,
    updateRelease
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackOptions);
