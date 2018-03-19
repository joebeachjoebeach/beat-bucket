// BUCKET-CONTAINER

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBucket } from '../../redux/actions/actions-sequence';
import './bucket-container.css';

import Bucket from '../bucket';
import ThreeDotsSVG from '../svg/three-dots-svg.jsx';
import BucketOptions from '../bucket-options';

class BucketContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, showOptions: false };
    this.handleThreeDotsClick = this.handleThreeDotsClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  handleThreeDotsClick() {
    // this.setState({ showOptions: true });
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false, showOptions: false });
  }

  hideOptions() {
    this.setState({ showOptions: false });
  }

  render() {
    const { hover, showOptions } = this.state;
    const { trackId, bucketId, notes } = this.props;
    return (
      <div
        className="bucket-container"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Bucket { ...this.props } />
        <div className="deletebucket-container">
          {hover && <button
            onClick={this.handleThreeDotsClick}
            className="button-dark delete-bucket"
            title="delete bucket"
          >
            <ThreeDotsSVG className="three-dots" />
          </button>}
        </div>
        {showOptions && hover && 
          <BucketOptions
            trackId={trackId}
            bucketId={bucketId}
            notes={notes}
            hideParentOptions={this.hideOptions}
          />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket }, dispatch);
}

export default connect(null, mapDispatchToProps)(BucketContainer);
