// BUCKET

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../dnd/item-types';
import { deleteBucket } from '../../redux/actions/actions-sequence';
import { selectNextId } from '../../redux/selectors';
import './bucket.css';

import NoteInBucket from '../note-in-bucket';

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleDeleteBucketClick = this.handleDeleteBucketClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleDeleteBucketClick() {
    const { trackId, bucketId, deleteBucket } = this.props;
    deleteBucket({ trackId: trackId, bucketId });
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  renderNotes() {
    const { notes, currentNote, bucketId, trackId, nextId } = this.props;
    return notes.map((note, i) => {
      let active = currentNote[0] === bucketId && currentNote[1] === i;

      return (
        <NoteInBucket
          value={note.value}
          active={active}
          index={i}
          key={i}
          id={note.id}
          bucketId={bucketId}
          trackId={trackId}
          nextId={nextId}
        />
      );
    });
  }

  render() {
    return this.props.connectDropTarget(
      <div
        className="bucket-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="bucket">
          {this.renderNotes()}
        </div>
        <div className="deletebucket-container">
          {this.state.hover &&
            <button
              onClick={this.handleDeleteBucketClick}
              className="deletebucket"
              title="delete bucket"
            >
              x
            </button>
          }
        </div>
      </div>
    );
  }

}

const bucketTarget = {
  drop(props, monitor) {
    if (monitor.didDrop())
      return;
    return {
      target: 'bucket',
      bucketId: props.bucketId,
      trackId: props.trackId,
      nextId: props.nextId,
      length: props.notes.length
    };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state, ownProps) {
  return { nextId: selectNextId(ownProps.trackId)(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket }, dispatch);
}

const dt_Bucket = DropTarget(ItemTypes.NOTE, bucketTarget, collect)(Bucket);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Bucket);
