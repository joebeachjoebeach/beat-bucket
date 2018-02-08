// EDITABLE-TEXT

import React from 'react';
import './editable-text.css';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.textInput)
      this.focusInput();
  }

  handleClick() {
    this.setState({ editing: true });
  }

  handleBlur() {
    this.setState({ editing: false });
  }

  focusInput() {
    this.textInput.focus();
    // this.textInput.select();
  }

  onInputChange(event) {
    this.props.onInputChange(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleBlur();
  }

  render() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            className="editable-text editable-text-input"
            value={this.props.value}
            onBlur={this.handleBlur}
            onChange={this.onInputChange}
            ref={(input) => { this.textInput = input; }}
          />
        </form>
      );
    }
    else {
      return (
        <div className="editable-text editable-text-div">
          <span onClick={this.handleClick}>{this.props.value}</span>
        </div>
      );
    }
  }
}

export default EditableText;
