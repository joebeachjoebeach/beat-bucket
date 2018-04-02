// ENVELOPE

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEnvelope } from '../../redux/selectors';
import {
  updateAttack,
  updateDecay,
  updateSustain,
  updateRelease } from '../../redux/actions/actions-synth';
import './envelope.css';

const EnvelopeSlider = ({ text, ...restProps }) => {
  return (
    <div className="envelope-slider">
      <label className="envelope-slider-label">{text}</label>
      <input
        className="slider envelope-slider-range"
        type="range"
        { ...restProps }
      />
    </div>
  );
};

const Envelope = ({
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
    <div className="envelope">
      <EnvelopeSlider
        text="Attack"
        min="0.001"
        max="2"
        step="0.01"
        value={envelope.attack}
        onChange={handleAttackChange}
      />
      <EnvelopeSlider
        text="Decay"
        min="0"
        max="3"
        step="0.01"
        value={envelope.decay}
        onChange={handleDecayChange}
      />
      <EnvelopeSlider
        text="Sustain"
        min="0"
        max="1"
        step="0.01"
        value={envelope.sustain}
        onChange={handleSustainChange}
      />
      <EnvelopeSlider
        text="Release"
        min="0.001"
        max="10"
        step="0.01"
        value={envelope.release}
        onChange={handleReleaseChange}
      />
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
    updateRelease,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelope);
