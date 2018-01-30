// PROJECT

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import { play, stop } from '../../redux/actions/actions-globals';
import { selectPlaying, selectProjectTitle } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import './project.css';

import Tracks from '../tracks';
import EditableText from '../../components/editable-text';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { editingTitle: false };

    this.handlePlayStopClick = this.handlePlayStopClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
  }

  handlePlayStopClick() {
    const { playing, stop, play } = this.props;
    playing
      ? stop()
      : play();
  }

  handleTitleClick() {
    this.setState({ editingTitle: true });
  }

  handleTitleBlur() {
    this.setState({ editingTitle: false });
  }

  renderPlayStop() {
    const className = this.props.playing ? 'stop' : 'play';
    return (
      <button onClick={this.handlePlayStopClick} className="project-playbutton">
        <div className={className} />
      </button>
    );
  }

  renderTitle() {
    if (this.state.editingTitle) {
      return (
        <input
          value={this.props.title}
          className="project-title project-title-input"
          onBlur={this.handleTitleBlur}
        />
      );
    }
    else {
      return (
        <div
          className="project-title"
          onClick={this.handleTitleClick}
        >
          {this.props.title}
        </div>
      );
    }
  }

  render() {
    return this.props.connectDropTarget(
      <div className="project">
        <div className="project-header">
          <EditableText value={this.props.title} />
          {this.renderPlayStop()}
          <button className="project-savebutton">Save</button>
        </div>
        <Tracks />
      </div>
    );
  }
}

const projectTarget = {
  drop(_, monitor) {
    // if it's been dropped on a child target, don't do anything
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state) {
  return {
    playing: selectPlaying(state),
    title: selectProjectTitle(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

const dt_Project = DropTarget(ItemTypes.NOTE, projectTarget, collect)(Project);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Project);
