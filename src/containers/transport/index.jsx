import React from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop } from '../../actions';

import { playSequence } from '../../sequencer';

import './transport.css';

const Transport = ({ bpm, tracks, play, stop }) => {

  function handlePlayClick() {
    play();
    // playSequence(tracks, console.log);
  }

  function handleStopClick() {
    stop();
    // Tone.Transport.stop();
  }

  return (
    <div className="transport">
      <button onClick={handleStopClick}>Stop</button>
      <button onClick={handlePlayClick}>Play</button>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

function mapStateToProps({ globals: { bpm, playing }, tracks }) {
  return { bpm, playing, tracks };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transport);
