import React, {Component} from "react";

import "../css/Button.css";

export default class Button extends Component {
  clickSelf = () => {
    this.props.resolveButtonPress(this.props.text, this.props.type);
  };
  render() {
    return (
      <button
        className="calcButton"
        id={this.props.description}
        onClick={this.clickSelf}
      >
        {this.props.displayText}
      </button>
    );
  }
}
