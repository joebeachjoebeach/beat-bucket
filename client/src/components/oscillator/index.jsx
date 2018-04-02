// OSCILLATOR

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOscillator } from '../../redux/selectors';
import {
  updateOscillatorType,
  updateOscillatorDetune } from '../../redux/actions/actions-synth';

import './oscillator.css';

import SawtoothSVG from '../svg/sawtooth-svg';
import SineSVG from '../svg/sine-svg';
import TriangleSVG from '../svg/triangle-svg';
import SquareSVG from '../svg/square-svg';

const Oscillator = ({ id, oscillator, updateOscillatorType, updateOscillatorDetune }) => {

  const { type, detune } = oscillator;

  function handleOscTypeClick(type) {
    updateOscillatorType({ type, trackId: id });
  }

  function handleOscDetuneChange(event) {
    updateOscillatorDetune({ value: Number(event.target.value), trackId: id});
  }

  return (
    <div className="oscillator">
      <div className="oscillator-type">
        Wave Shape:
        <div className="oscillator-type-buttons">
          <button
            className="button-light oscillator-type-button"
            disabled={type === 'sine'}
            onClick={() => handleOscTypeClick('sine')}
          >
            <SineSVG className="oscillator-type-wave-svg" />
          </button>

          <button
            className="button-light oscillator-type-button"
            disabled={type === 'triangle'}
            onClick={() => handleOscTypeClick('triangle')}
          >
            <TriangleSVG className="oscillator-type-wave-svg" />
          </button>

          <button
            className="button-light oscillator-type-button"
            disabled={type === 'sawtooth'}
            onClick={() => handleOscTypeClick('sawtooth')}
          >
            <SawtoothSVG className="oscillator-type-wave-svg" />
          </button>
          <button
            className="button-light oscillator-type-button"
            disabled={type === 'square'}
            onClick={() => handleOscTypeClick('square')}
          >
            <SquareSVG className="oscillator-type-wave-svg" />
          </button>
        </div>
      </div>

      <div className="oscillator-detune">
        Detune:
        <div className="oscillator-detune-slider">
          <input
            className="oscillator-detune-slider-input"
            type="range"
            min={-100}
            max={100}
            value={detune}
            onChange={handleOscDetuneChange}
          />
          {detune}
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state, ownProps) {
  return { oscillator: selectOscillator(ownProps.id)(state)};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateOscillatorType, updateOscillatorDetune }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator);
