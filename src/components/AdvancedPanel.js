import React, {Component} from "react";

import Button from "./Button";

import {advancedButtons} from "../assets/buttonBank";

import "../css/AdvancedPanel.css";

export default class AdvancedPanel extends Component {
  setStyle = () => {
    const style = {};
    const onMobile = document.documentElement.clientWidth < 1000;
    const scrollPositioning = onMobile ? "top" : "left";
    style[scrollPositioning] = this.props.display
      ? onMobile
        ? "85%"
        : "68%"
      : "40%";
    return style;
  };
  render() {
    const styleObject = this.setStyle();
    const buttonElements = advancedButtons.map((btn) => {
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
          displayText={btn.displayText}
          type={btn.type}
          resolveButtonPress={this.props.resolveButtonPress}
        />
      );
    });

    return (
      <div id="advancedPanel" style={styleObject}>
        <div id="panelHeader">
          <h2>Advanced Buttons</h2>
        </div>
        <div id="advancedButtonGrid">{buttonElements}</div>
      </div>
    );
  }
}
