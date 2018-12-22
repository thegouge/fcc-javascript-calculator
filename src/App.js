import React, {Component} from "react";
import * as math from "mathjs";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import AdvancedButton from "./components/AdvancedButton";
import Display from "./components/Display";
import Footer from "./components/Footer";

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
    const calcText = this.state.calcText;
    switch (buttonText) {
      case "C":
        this.setState({
          calcText: "0"
        });
        break;

      case "=":
        this.setState({calcText: this.evaluate(calcText)});
        break;

      case "+/-":
        const lastNum = calcText.substr;
        this.setState({calcText: `${-1 * calcText}`});
        break;

      default:
        this.setState({
          calcText: calcText + buttonText
        });
    }
  };
  evaluate = (expression) => {
    return `${math.eval(expression)}`;
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
        <Footer />
      </div>
    );
  }
}
