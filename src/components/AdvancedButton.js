import React from "react";
import Button from "./Button";

export default class AdvancedButton extends Button {
  render() {
    return (
      <button
        className="calcButton"
        id="advancedToggle"
        onClick={this.props.toggle}
      >
        Adv
      </button>
    );
  }
}
