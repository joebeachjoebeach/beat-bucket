// OSCILLATOR

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOscillator } from '../../redux/selectors';
import { updateOscillatorType } from '../../redux/actions/actions-synth';

import './oscillator.css';

import SawtoothSVG from '../svg/sawtooth-svg';
import SineSVG from '../svg/sine-svg';
import TriangleSVG from '../svg/triangle-svg';
import SquareSVG from '../svg/square-svg';

const Oscillator = ({ id, oscillator, updateOscillatorType }) => {

  function handleOscillatorClick(type) {
    updateOscillatorType({ type, trackId: id });
  }

  return (
    <div className="oscillator">
      Wave Shape:
      <div className="oscillator-buttons">
        <button
          className="button-light oscillator-button"
          disabled={oscillator.type === 'sine'}
          onClick={() => handleOscillatorClick('sine')}
        >
          <SineSVG className="wave-svg" />
        </button>

        <button
          className="button-light oscillator-button"
          disabled={oscillator.type === 'triangle'}
          onClick={() => handleOscillatorClick('triangle')}
        >
          <TriangleSVG className="wave-svg" />
        </button>

        <button
          className="button-light oscillator-button"
          disabled={oscillator.type === 'sawtooth'}
          onClick={() => handleOscillatorClick('sawtooth')}
        >
          <SawtoothSVG className="wave-svg" />
        </button>
        <button
          className="button-light oscillator-button"
          disabled={oscillator.type === 'square'}
          onClick={() => handleOscillatorClick('square')}
        >
          <SquareSVG className="wave-svg" />
        </button>
      </div>
    </div>
  );
};


function mapStateToProps(state, ownProps) {
  return { oscillator: selectOscillator(ownProps.id)(state)};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateOscillatorType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Oscillator);
