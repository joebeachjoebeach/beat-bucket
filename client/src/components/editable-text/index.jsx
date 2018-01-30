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
  }

  render() {
    if (this.state.editing) {
      return (
        <input
          value={this.props.value}
          onBlur={this.handleBlur}
          ref={(input) => { this.textInput = input; }}
        />
      );
    }
    else {
      return (
        <div onClick={this.handleClick}>
          {this.props.value}
        </div>
      );
    }
  }
}

export default EditableText;
