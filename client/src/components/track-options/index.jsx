// TRACK-OPTIONS

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEnvelope, selectOscillator, selectFilter } from '../../redux/selectors';
import {
  updateFilterFrequency,
  updateFilterType } from '../../redux/actions/actions-track';
import {
  updateAttack,
  updateDecay,
  updateSustain,
  updateRelease,
  updateOscillatorType } from '../../redux/actions/actions-synth';

import './track-options.css';

import Oscillator from '../oscillator';
// import Filter from '../filter';
// import Envelope from '../envelope';

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

// const TrackOptions = ({
//   id,
//   filter,
//   envelope,
//   oscillator,
//   updateAttack,
//   updateDecay,
//   updateSustain,
//   updateRelease,
//   updateOscillatorType,
//   updateFilterFrequency,
//   updateFilterType }) => {

//   function handleAttackChange(event) {
//     updateAttack({ value: Number(event.target.value), trackId: id });
//   }

//   function handleDecayChange(event) {
//     updateDecay({ value: Number(event.target.value), trackId: id });
//   }

//   function handleSustainChange(event) {
//     updateSustain({ value: Number(event.target.value), trackId: id });
//   }

//   function handleReleaseChange(event) {
//     updateRelease({ value: Number(event.target.value), trackId: id });
//   }

//   function handleOscillatorClick(type) {
//     updateOscillatorType({ type, trackId: id });
//   }

//   function handleFrequencyChange(value) {
//     updateFilterFrequency({ value, trackId: id });
//   }

//   function handleFilterTypeChange(event) {
//     updateFilterType({ type: event.target.value, trackId: id });
//   }

//   return (
//     <div className="track-options">
//       <div className="track-options-left">
//         Envelope:
//         <TrackOptionsSlider
//           text="Attack"
//           min="0.001"
//           max="2"
//           step="0.01"
//           value={envelope.attack}
//           onChange={handleAttackChange}
//         />
//         <TrackOptionsSlider
//           text="Decay"
//           min="0"
//           max="3"
//           step="0.01"
//           value={envelope.decay}
//           onChange={handleDecayChange}
//         />
//         <TrackOptionsSlider
//           text="Sustain"
//           min="0"
//           max="1"
//           step="0.01"
//           value={envelope.sustain}
//           onChange={handleSustainChange}
//         />
//         <TrackOptionsSlider
//           text="Release"
//           min="0.001"
//           max="10"
//           step="0.01"
//           value={envelope.release}
//           onChange={handleReleaseChange}
//         />
//       </div>
//       <div className="track-options-right">
//         Oscillator:
//         <div className="track-options-oscillator-buttons">
//           <button
//             className="button-light oscillator-button"
//             disabled={oscillator.type === 'sine'}
//             onClick={() => handleOscillatorClick('sine')}
//           >
//             <SineSVG className="wave-svg" />
//           </button>

//           <button
//             className="button-light oscillator-button"
//             disabled={oscillator.type === 'triangle'}
//             onClick={() => handleOscillatorClick('triangle')}
//           >
//             <TriangleSVG className="wave-svg" />
//           </button>

//           <button
//             className="button-light oscillator-button"
//             disabled={oscillator.type === 'sawtooth'}
//             onClick={() => handleOscillatorClick('sawtooth')}
//           >
//             <SawtoothSVG className="wave-svg" />
//           </button>

//           <button
//             className="button-light oscillator-button"
//             disabled={oscillator.type === 'square'}
//             onClick={() => handleOscillatorClick('square')}
//           >
//             <SquareSVG className="wave-svg" />
//           </button>

//         </div>
//         <div className="track-options-filter">
//           Filter:
//           <LogarithmicSlider
//             name="frequency"
//             value={filter.frequency}
//             minPosition={1}
//             maxPosition={200}
//             minValue={26}
//             maxValue={20000}
//             label={`${Math.round(filter.frequency)} Hz`}
//             onChange={handleFrequencyChange}
//             className="track-options-filter-frequency"
//           />
//           <select
//             name="filter-type"
//             value={filter.type}
//             onChange={handleFilterTypeChange}
//           >
//             <option value="lowpass">low pass</option>
//             <option value="highpass">high pass</option>
//             <option value="bandpass">band pass</option>
//             <option value="notch">notch</option>
//           </select>

//         </div>
//       </div>
//     </div>
//   );
// };

export class TrackOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'osc' };
    this.buttonClass = 'track-options-sidebar-button';
    this.activeButtonClass = this.buttonClass + ' ' + this.buttonClass + '-active';
  }

  setMode(mode) {
    this.setState({ mode: mode });
  }

  render() {
    const { mode } = this.state;
    const { id } = this.props;
    return (
      <div className="track-options">
        <div className="track-options-sidebar">
          <button
            className={`${mode === 'osc' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('osc')}
          >
            Oscillator
          </button>
          <button
            className={`${mode === 'filter' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('filter')}
          >
            Filter
          </button>
          <button
            className={`${mode === 'env' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('env')}
          >
            Envelope
          </button>
        </div>

        <div className="track-options-content">
          {/*mode === 'osc'
            ? <Oscillator />
            : mode === 'filter'
              ? <Filter />
              : <Envelope />
          */}
          <Oscillator id={id} />


        </div>

      </div>
    );
  }
}

// function TrackOptionsContent({ mode }) {
//   return mode === 'osc'
//     ? <Oscillator />
//     : mode === 'filter'
//       ? <Filter />
//       : <Envelope />;
// }


function mapStateToProps(state, { id }) {
  return {
    envelope: selectEnvelope(id)(state),
    oscillator: selectOscillator(id)(state),
    filter: selectFilter(id)(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateAttack,
    updateDecay,
    updateSustain,
    updateRelease,
    updateOscillatorType,
    updateFilterFrequency,
    updateFilterType
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackOptions);
