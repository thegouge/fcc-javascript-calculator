import React, {Component} from "react";
import * as math from "mathjs";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import Display from "./components/Display";
import Footer from "./components/Footer";

import {basicButtons} from "./assets/buttonBank";
import regexLastIndexOf from "./assets/regexLastIndexOf";

import "./css/App.css";

const PIE = 3.14159;

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
        //eslint-disable-next-line
        if (calcText != PIE) calcText += PIE;
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
    let cleanText = text.replace(/0{2,}/, "");
    cleanText = cleanText.replace(/0(?=\d)/, "");
    cleanText = cleanText.replace(/(?<=\.)\.|(?<=\.\d+)\./, "");
    const regex = /[+\-*]{2,}/;
    if (regex.test(cleanText)) {
      let multiOperation = cleanText.match(regex)[0];
      let lastOperation = multiOperation[multiOperation.length - 1];
      cleanText = cleanText.replace(multiOperation, lastOperation);
    }
    return cleanText !== "" ? cleanText : "0";
  };

  changeLastNumberSign = (text) => {
    if (text === "0") return text;

    const lastOperandIndex = regexLastIndexOf(text, /[+\-*/]/) + 1;
    const lastNumber = parseInt(text.substring(lastOperandIndex));

    return `${text.slice(0, lastOperandIndex)}(${lastNumber * -1})`;
  };

  convertTo = (type) => {
    return type;
  };

  evaluate = (expression) => {
    if (/[+\-/*.]$/.test(expression)) {
      alert(`not a valid equation!`);
      return;
    }
    return `${math.eval(expression)}`;
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
