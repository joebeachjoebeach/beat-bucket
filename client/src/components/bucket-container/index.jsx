// BUCKET-CONTAINER

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBucket } from '../../redux/actions/actions-sequence';
import './bucket-container.css';

import Bucket from '../bucket';

class BucketContainer extends Component {
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

  render() {
    return (
      <div
        className="bucket-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Bucket { ...this.props } />
        <div className="deletebucket-container">
          {this.state.hover &&
            <button
              onClick={this.handleDeleteBucketClick}
              className="button-dark delete-bucket"
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket }, dispatch);
}

export default connect(null, mapDispatchToProps)(BucketContainer);
