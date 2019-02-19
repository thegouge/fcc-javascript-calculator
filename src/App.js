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
        calcText = this.addExponent(calcText);
        break;

      case "pi":
        if (calcText !== `${PIE}`) calcText += PIE;
        break;

      case "rev":
        calcText = this.reverseLastNumber(calcText);
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

  getLastNumber = (text) => {
    const lastOperandIndex = regexLastIndexOf(text, /[+\-*/]/) + 1;
    return parseInt(text.substring(lastOperandIndex));
  };

  changeLastNumberSign = (text) => {
    if (text === "0") return text;
    const lastNumber = this.getLastNumber(text);

    return `${text.slice(0, text.lastIndexOf(lastNumber))}(${lastNumber * -1})`;
  };

  reverseLastNumber = (text) => {
    if (text === "0") return text;
    const lastNumber = this.getLastNumber(text);

    return `${text.slice(0, text.lastIndexOf(lastNumber))}(1/${lastNumber})`;
  };

  addExponent = (text) => {
    const lastNumber = this.getLastNumber(text);

    return `${text.slice(0, text.lastIndexOf(lastNumber))}(${lastNumber})^(`;
  };

  convertTo = (calcText, type) => {
    const seconds = this.calculateTime(calcText);

    switch (type) {
      case "H":
        return toHours(seconds);

      case "M":
        return toMinutes(seconds);

      case "S":
        return seconds + "s";

      default:
        break;
    }
  };

  calculateTime = (text) => {
    if (!/[hms]/.test(text)) {
      alert("Invalid Input!");
      return;
    }
    return text
      .split(/[/+*-]/)
      .map((time) => toSeconds(time))
      .reduce((tot, curr) => tot + curr, 0);
  };

  evaluate = (expression) => {
    if (/[hms]/.test(expression)) {
      const resolvedToSeconds = this.calculateTime(expression);
      return notate(resolvedToSeconds);
    } else if (/\|/.test(expression)) {
      const expressionToBeAbs = expression.replace(/(\|)(.{0,})\1/, "$2");
      let evaluatedExpression = math.eval(expressionToBeAbs);
      return evaluatedExpression < 0
        ? evaluatedExpression * -1
        : evaluatedExpression;
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
