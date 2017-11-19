import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop } from '../../actions';

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

function mapStateToProps({ globals: { playing }}) {
  return { playing };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transport);
