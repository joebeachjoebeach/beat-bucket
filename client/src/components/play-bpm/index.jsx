// PLAY-BPM

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop, changeBPM } from '../../redux/actions/actions-project';
import { selectPlaying, selectBPM } from '../../redux/selectors';
import './play-bpm.css';

const PlayBPM = ({ playing, bpm, play, stop, changeBPM }) => {

  function handlePlayStopClick() {
    playing
      ? stop()
      : play();
  }

  function handleBPMChange(event) {
    let newBPM = Number(event.target.value);
    changeBPM({ bpm: newBPM });
  }

  function renderPlayStop() {
    const className = playing ? 'stop' : 'play';
    return (
      <button
        title={className}
        onClick={handlePlayStopClick}
        className="playstop-button button-dark"
      >
        <div className={className} />
      </button>
    );
  }

  return (
    <div className="play-bpm">
      {renderPlayStop()}
      <input
        title="change bpm"
        name="bpm"
        className="button-dark bpm-input"
        type="number"
        min="20"
        max="400"
        value={bpm}
        onChange={handleBPMChange}
      />
      <label htmlFor="bpm" className="bpm-label">bpm</label>
    </div>
  );
};


function mapStateToProps(state) {
  return { playing: selectPlaying(state), bpm: selectBPM(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop, changeBPM }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBPM);
