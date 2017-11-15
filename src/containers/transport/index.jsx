import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop } from '../../actions';

import { playSequence } from '../../sequencer';

import './transport.css';

const Transport = ({ play, stop }) => {

  function handlePlayClick() {
    play();
  }

  function handleStopClick() {
    stop();
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

export default connect(null, mapDispatchToProps)(Transport);
