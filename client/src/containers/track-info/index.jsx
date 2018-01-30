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
import { changeTrackName } from '../../redux/actions/actions-track';
import { selectTrack } from '../../redux/selectors';
import './track-info.css';

import EditableText from '../../components/editable-text';

class TrackInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.handleSoloClick = this.handleSoloClick.bind(this);
    this.handleDeleteTrackClick = this.handleDeleteTrackClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTrackNameChange = this.handleTrackNameChange.bind(this);
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

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleTrackNameChange(name) {
    this.props.changeTrackName({ name, trackId: this.props.id });
  }

  render() {
    const { name } = this.props;
    const { hover } = this.state;
    return (
      <div className="track-info"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="track-info-left">
          {hover && 
            <button className="track-info-delete" onClick={this.handleDeleteTrackClick}>
              x
            </button>
          }
        </div>
        <div className="track-info-right">
          <div className="track-info-text">
            <EditableText value={name} onInputChange={this.handleTrackNameChange} />
          </div>
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
  const actions = {
    mute,
    solo,
    unmute,
    unsolo,
    deleteTrack,
    changeTrackName
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);
