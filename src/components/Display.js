import React, {Component} from "react";

import "../css/Display.css";

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prettyText: props.calcText
    };
  }
  makeTextPretty = (text) => {
    let prettyText = text;
    let minus = <span>&ndash;</span>;
    minus = minus.props.children;

    ["+", "-", "*", "/"].forEach((operand) => {
      prettyText = prettyText.split(operand).join(` ${operand} `);
    });

    prettyText = prettyText.replace(/([hms])/g, "$1 ");
    prettyText = prettyText.replace("*", "x");
    prettyText = prettyText.replace("-", minus);

    return `${prettyText}`;
  };
  render() {
    return (
      <div id="displayBox">
        <div id="display">{this.makeTextPretty(this.props.calcText)}</div>
      </div>
    );
  }
}
