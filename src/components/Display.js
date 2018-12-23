import React, {Component} from "react";

import "../css/Display.css";

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyText: this.makeTextPretty(props.calcText)
    };
  }
  makeTextPretty = (text) => {
    return text;
  };
  render() {
    return (
      <div id="displayBox">
        <div id="display">{this.props.calcText}</div>
      </div>
    );
  }
}
