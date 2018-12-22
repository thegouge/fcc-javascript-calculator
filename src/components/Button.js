import React, {Component} from "react";

import "../css/Button.css";

export default class Button extends Component {
  handleClick = () => {
    let output;
    switch (this.props.text) {
      case "x":
        output = "*";
        break;

      default:
        output = this.props.text;
    }
    this.props.update(output);
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
