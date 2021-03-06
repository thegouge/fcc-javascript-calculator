import React, {Component} from "react";
import * as math from "mathjs";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import Display from "./components/Display";
import Footer from "./components/Footer";

import {basicButtons} from "./logicAssets/buttonBank";
import regexLastIndexOf from "./logicAssets/regexLastIndexOf";
import {
  evaluateTimeExpression,
  resolveToHours,
  resolveToMinutes,
  resolveToSeconds,
} from "time-shenanigans";

import "./css/App.css";

const PIE = 3.14;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calcText: "0",
      advanced: false,
      basicButtons: basicButtons,
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
        calcText = this.lastNumberOperation(calcText, "swap");
        break;

      case "sqrt":
        calcText = math.sqrt(parseInt(calcText)).toString();
        break;

      case "exp":
        calcText = this.lastNumberOperation(calcText, "exp");
        break;

      case "pi":
        if (calcText !== `${PIE}`) calcText += PIE;
        break;

      case "rev":
        calcText = this.lastNumberOperation(calcText, "rev");
        break;

      case "abs":
        calcText = `|${calcText}|`;
        break;

      case "con":
        calcText = this.convertTo(calcText, type);
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
      advanced: !this.state.advanced,
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

  lastNumberOperation = (text, type) => {
    if (text === "0") return text;

    const lastOperandIndex = regexLastIndexOf(text, /[+\-*/]/) + 1;
    const lastNumber = parseInt(text.substring(lastOperandIndex));
    let endString;

    switch (type) {
      case "swap":
        endString = `(${lastNumber * -1})`;
        break;

      case "exp":
        endString = `(${lastNumber})^(`;
        break;

      case "rev":
        endString = `(1/${lastNumber})`;
        break;

      default:
        break;
    }

    return `${text.slice(0, text.lastIndexOf(lastNumber))}${endString}`;
  };

  convertTo = (calcText, type) => {
    switch (type) {
      case "H":
        return resolveToHours(calcText);

      case "M":
        return resolveToMinutes(calcText);

      case "S":
        return resolveToSeconds(calcText);

      default:
        break;
    }
  };

  evaluate = (expression) => {
    return evaluateTimeExpression(expression);
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
