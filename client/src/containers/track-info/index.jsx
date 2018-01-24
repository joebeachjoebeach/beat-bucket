// TRACK-INFO

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectTrack } from '../../redux/selectors';
import './track-info.css';

const TrackInfo = ({ name }) => {

  return (
    <div className="track-info">
      <div className="track-info-left">x</div>
      <div className="track-info-right">
        <div className="track-info-title">{name}</div>
        <div className="track-info-buttons">
          <button className="track-info-button">m</button>
          <button className="track-info-button">s</button>
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state, ownProps) {
  return selectTrack(ownProps.id)(state);
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(_, dispatch);
// }

export default connect(mapStateToProps)(TrackInfo);
