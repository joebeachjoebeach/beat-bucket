// PROJECT-BUTTONS

import React from 'react';
import './project-buttons.css';

import PlayBPM from '../play-bpm';
import DeleteShareSave from '../delete-share-save';

class ProjectButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.hideMessage = this.hideMessage.bind(this);
  }

  componentDidUpdate() {
    this.state.message &&
      setTimeout(() => { this.hideMessage(); }, 3000);
  }

  hideMessage() {
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="project-buttons">
        <div className="project-buttons-buttons">
          <PlayBPM />
          <DeleteShareSave
            {...this.props}
            setMessage={message => this.setState({ message })}
          />
        </div>
        <div className="project-buttons-message">
          {message &&
            <span>
              {message}
              <button
                title="hide message"
                className="button-dark close-message"
                onClick={this.hideMessage}
              >
                x
              </button>
            </span>
          }
        </div>
      </div>
    );
  }
}

export default ProjectButtons;
