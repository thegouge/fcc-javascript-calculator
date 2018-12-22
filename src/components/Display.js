import React, {Component} from "react";

import "../css/Display.css";

export default class Display extends Component {
  cleanText = (text) => {
    let cleanText = text.replace(/0{2,}/, "");
    cleanText = cleanText.replace(/0(?=\d)/, "");
    return cleanText !== "" ? cleanText : "0";
  };
  render() {
    return (
      <div id="displayBox">
        <div id="display">{this.cleanText(this.props.calcText)}</div>
      </div>
    );
  }
}
