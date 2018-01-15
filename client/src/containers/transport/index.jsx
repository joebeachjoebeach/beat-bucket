// TRANSPORT

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop } from '../../redux/actions/actions-globals';
import { selectPlaying } from '../../redux/selectors';

import './transport.css';

const Transport = ({ play, stop, playing }) => {

  function handlePlayStopClick() {
    playing
      ? stop()
      : play();
  }

  function renderPlayStop() {
    const text = playing ? 'Stop' : 'Play';
    return <button onClick={handlePlayStopClick}>{text}</button>;
  }

  return (
    <div className="transport">
      {renderPlayStop()}
    </div>
  );
};

function mapStateToProps(state) {
  return { playing: selectPlaying(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transport);
