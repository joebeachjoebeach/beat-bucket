// SHARING

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { share, unshare } from '../../redux/actions/actions-project';
import { WEB_BASE_URL, resourceRequest } from '../../utils';
import './sharing.css';

class Sharing extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: !props.shared };
  }

  componentDidMount() {
    !this.props.shared &&
      this.updateSharedStatus(true);
  }

  updateSharedStatus(shared) {
    const { bpm, name, id, tracks, hideDropDown, setMessage, setUser } = this.props;

    resourceRequest('put', 'save', {
      success: () => {
        shared
          ? this.handleShareSuccess()
          : this.handleUnshareSuccess();
      },
      failure: err => {
        hideDropDown();
        setMessage(err.response.data);
      },
      authFailure: () => { 
        hideDropDown();
        setUser({ email: null, userId: null });
      }
    },
    { bpm, name, tracks, shared, id });
  }

  handleShareSuccess() {
    this.setState({ loading: false });
    this.props.share();
  }

  handleUnshareSuccess() {
    this.props.hideDropDown();
    this.props.setMessage('This project is no longer shared.');
    this.props.unshare();
  }
  

  render() {
    const { shared, id } = this.props;
    const shareURL = `${WEB_BASE_URL}share/${id}`;

    if (this.state.loading) {
      return (
        <div className="sharing">
          Getting shared link...
        </div>
      );
    }

    return (
      <div className="sharing">
        {shared &&
          <div className="sharing-url">
            <label className="sharing-url-item" htmlFor="url">
              Here's your shared URL:
            </label>
            <input
              className="sharing-url-input sharing-url-item"
              name="url"
              onClick={() => this.urlInput.select()}
              value={shareURL}
              readOnly
              ref={input => { this.urlInput = input; }}
            />
          </div>
        }
        <button
          className="button-light"
          onClick={() => this.updateSharedStatus(false)}
        >
          Unshare Project
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ share, unshare }, dispatch);
}

export default connect(null, mapDispatchToProps)(Sharing);
