import React, {Component} from "react";

import "../css/Button.css";

export default class Button extends Component {
  handleClick = () => {
    this.props.update(this.props.text);
  };
  render() {
    return (
      <button
        className="calcButton"
        id={this.props.description}
        onClick={this.handleClick}
      >
        {this.props.text}
      </button>
    );
  }
}
