// EDITABLE-TEXT

import React from 'react';
import './editable-text.css';

class EditableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, value: props.value };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(_, prevState) {
    // focus and highlight when clicked
    if (!prevState.editing && this.state.editing)
      this.focusInput();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value)
      this.setState({ value: nextProps.value });
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
    this.setState({ editing: true });
  }

  handleBlur() {
    this.state.value !== ''
      ? this.props.onBlur(this.state.value)
      : this.setState({ value: this.props.value });
    this.setState({ editing: false });
  }

  focusInput() {
    this.textInput.focus();
    this.textInput.select();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleBlur();
  }

  render() {
    const { title, value } = this.props;
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input"
            title={title}
            className="editable-text editable-text-input"
            value={this.state.value}
            onBlur={this.handleBlur}
            onChange={this.handleInputChange}
            ref={input => { this.textInput = input; }}
          />
        </form>
      );
    }
    else {
      return (
        <div className="editable-text editable-text-div" onClick={this.handleClick}>
          <span title={title}>{value}</span>
        </div>
      );
    }
  }
}

export default EditableText;
