// TRACK-OPTIONS

import React, { Component } from 'react';
import './track-options.css';

import Oscillator from '../oscillator';
import Filter from '../filter';
import Envelope from '../envelope';

export class TrackOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'osc' };
    this.buttonClass = 'track-options-sidebar-button';
    this.activeButtonClass = this.buttonClass + ' ' + this.buttonClass + '-active';
    this.contentMap = {
      osc: <Oscillator id={props.id} />,
      filter: <Filter id={props.id} />,
      env: <Envelope id={props.id} />
    };
  }

  setMode(mode) {
    this.setState({ mode: mode });
  }

  render() {
    const { mode } = this.state;
    const { id } = this.props;
    return (
      <div className="track-options">
        <div className="track-options-sidebar">
          <button
            className={`${mode === 'osc' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('osc')}
          >
            Oscillator
          </button>
          <button
            className={`${mode === 'filter' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('filter')}
          >
            Filter
          </button>
          <button
            className={`${mode === 'env' ? this.activeButtonClass : this.buttonClass}`}
            onClick={() => this.setMode('env')}
          >
            Envelope
          </button>
        </div>

        <div className="track-options-content">
          {this.contentMap[mode]}
        </div>
        
      </div>
    );
  }
}

export default TrackOptions;
