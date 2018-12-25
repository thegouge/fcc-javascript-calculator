import React, {Component} from "react";

import Button from "./Button";

import {advancedButtons} from "../assets/buttonBank";

import "../css/AdvancedPanel.css";

export default class AdvancedPanel extends Component {
  render() {
    const buttonElements = advancedButtons.map((btn) => {
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
          resolveButtonPress={this.props.resolveButtonPress}
        />
      );
    });
    return (
      <div
        id="advancedPanel"
        style={this.props.display ? {left: 919} : {left: 624}}
      >
        <div id="panelHeader">
          <h2>Advanced Buttons</h2>
        </div>
        <div id="advancedButtonGrid">{buttonElements}</div>
      </div>
    );
  }
}
