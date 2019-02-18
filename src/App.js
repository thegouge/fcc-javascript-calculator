import React, {Component} from "react";
import * as math from "mathjs";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import Display from "./components/Display";
import Footer from "./components/Footer";

import {basicButtons} from "./assets/buttonBank";
import regexLastIndexOf from "./assets/regexLastIndexOf";
import {toSeconds, toMinutes, toHours, notate} from "./assets/timeCalc";

import "./css/App.css";

const PIE = 3.14;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calcText: "0",
      advanced: false,
      basicButtons: basicButtons
    };
  }

  resolveButtonPress = (buttonText, type = "null") => {
    let calcText = this.state.calcText;
    switch (buttonText) {
      case "Adv":
        this.toggleAdvPanel();
        break;

      case "C":
        calcText = ``;
        break;

      case "()":
        calcText += `${this.checkParenthBalance(calcText)}`;
        break;

      case "swap":
        calcText = `${this.changeLastNumberSign(calcText)}`;
        break;

      case "sqrt":
        calcText = math.sqrt(parseInt(calcText)).toString();
        break;

      case "exp":
        break;

      case "pi":
        if (calcText !== `${PIE}`) calcText += PIE;
        break;

      case "rev":
        break;

      case "abs":
        break;

      case "con":
        calcText = this.convertTo(type);
        break;

      case "=":
        calcText = `${this.evaluate(calcText)}`;
        break;

      default:
        calcText += `${buttonText}`;
    }
    calcText = this.cleanText(calcText);
    this.setState({calcText: calcText});
  };

  checkParenthBalance = (text) => {
    if (text === `0`) return "(";
    return /\(/.test(text) ? `)` : `(`;
  };

  toggleAdvPanel = () => {
    this.setState({
      advanced: !this.state.advanced
    });
  };

  cleanText = (text) => {
    // doesn't let a number start with any zeros
    let cleanText = text.replace(/0{0,}(?=[0-9])/, "");

    // doesn't allow more than one decimal per number
    cleanText = cleanText.replace(/(?<=\.)\.|(?<=\.\d+)\./, "");

    // doesn't allow more than one operation between numbers
    cleanText = cleanText.replace(/[/+\-*](?=[/+\-*])/, "");

    return cleanText !== "" ? cleanText : "0";
  };

  changeLastNumberSign = (text) => {
    if (text === "0") return text;

    const lastOperandIndex = regexLastIndexOf(text, /[+\-*/]/) + 1;
    const lastNumber = parseInt(text.substring(lastOperandIndex));

    return `${text.slice(0, lastOperandIndex)}(${lastNumber * -1})`;
  };

  convertTo = (type) => {
    console.log(type);
    const calcText = this.state.calcText;
    switch (type) {
      case "H":
        this.setState({
          calcText: toHours(calcText)
        });
        break;

      case "M":
        this.setState({
          calcText: toMinutes(calcText)
        });
        break;

      case "S":
        this.setState({
          calcText: toSeconds(calcText)
        });
        break;

      default:
        break;
    }
  };

  calculateTime = (text, matchlist) => {
    notate(toSeconds(text, matchlist));
  };

  evaluate = (expression) => {
    if (expression.match(/[hms]/g)) {
      this.calculateTime(expression);
    } else if (/[+\-/*.]$/.test(expression)) {
      alert(`not a valid equation!`);
      return;
    } else {
      return `${math.eval(expression)}`;
    }
  };

  render() {
    const buttons = this.state.basicButtons.map((btn) => {
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
          displayText={btn.displayText}
          resolveButtonPress={this.resolveButtonPress}
        />
      );
    });

    return (
      <div className="App">
        <AdvancedPanel
          display={this.state.advanced}
          resolveButtonPress={this.resolveButtonPress}
        />
        <div ref={"container"} id="calculator">
          <Display calcText={this.state.calcText} />
          <div id="buttonGrid">{buttons}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
