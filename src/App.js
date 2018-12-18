import React, {Component} from "react";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import AdvancedButton from "./components/AdvancedButton";
import Display from "./components/Display";

import {basicButtons} from "./assets/buttonBank";

import "./css/App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calcText: "0",
      advanced: false
    };
  }
  toggleAdvPanel = () => {
    this.setState({
      advanced: !this.state.advanced
    });
  };
  resolveButtonPress = (buttonText) => {
    switch (buttonText) {
      case "C":
        this.setState({
          calcText: "0"
        });
        break;

      default:
        this.setState({
          calcText: this.state.calcText + buttonText
        });
    }
  };
  render() {
    const buttons = basicButtons.map((btn) => {
      if (btn.desc === "advancedToggle") {
        return <AdvancedButton key={btn.desc} toggle={this.toggleAdvPanel} />;
      }
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
          update={this.resolveButtonPress}
        />
      );
    });
    return (
      <div className="App">
        <AdvancedPanel
          display={this.state.advanced}
          update={this.resolveButtonPress}
        />
        <div id="calculator">
          <Display calcText={this.state.calcText} />
          <div id="buttonGrid">{buttons}</div>
        </div>
      </div>
    );
  }
}
