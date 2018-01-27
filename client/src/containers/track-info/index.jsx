// TRACK-INFO

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  mute,
  solo,
  unmute,
  unsolo,
} from '../../redux/actions/actions-track';
import { deleteTrack } from '../../redux/actions/actions-tracks';
import { selectTrack } from '../../redux/selectors';
import './track-info.css';

class TrackInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.handleSoloClick = this.handleSoloClick.bind(this);
    this.handleDeleteTrackClick = this.handleDeleteTrackClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMuteClick() {
    const { id, mute, unmute, muted } = this.props;
    muted
      ? unmute(id)
      : mute(id);
  }

  handleSoloClick() {
    const { id, solo, unsolo, soloed } = this.props;
    soloed
      ? unsolo(id)
      : solo(id);
  }

  handleDeleteTrackClick() {
    const { id, deleteTrack } = this.props;
    deleteTrack({ trackId: id });
  }

  handleMouseOver() {
    this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  render() {
    const { name } = this.props;
    const { hover } = this.state;
    return (
      <div className="track-info"
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <div className="track-info-left">
          {hover && <button className="track-info-delete" onClick={this.handleDeleteTrackClick}>x</button>}
        </div>
        <div className="track-info-right">
          <div className="track-info-title">{name}</div>
          <div className="track-info-buttons">
            <button
              onClick={this.handleMuteClick}
              className="track-info-button"
            >
              m
            </button>
            <button
              onClick={this.handleSoloClick}
              className="track-info-button"
            >
              s
            </button>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return selectTrack(ownProps.id)(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mute, solo, unmute, unsolo, deleteTrack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);
