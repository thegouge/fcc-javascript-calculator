import React, {Component} from "react";
import * as math from "mathjs";

import AdvancedPanel from "./components/AdvancedPanel";
import Button from "./components/Button";
import Display from "./components/Display";
import Footer from "./components/Footer";

import {basicButtons} from "./assets/buttonBank";
import regexLastIndexOf from "./assets/regexLastIndexOf";

import "./css/App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {calcText: "0", advanced: false};

    this.resolveButtonPress = this.resolveButtonPress.bind(this);
  }

  resolveButtonPress(buttonText) {
    let calcText = this.state.calcText;
    switch (buttonText) {
      case "Adv":
        this.toggleAdvPanel();
        break;

      case "C":
        calcText = ``;
        break;

      case "=":
        /[+\-/*.]$/.test(calcText)
          ? alert(`not a valid equation!`)
          : (calcText = `${this.evaluate(calcText)}`);
        break;

      case "()":
        calcText += `${this.checkParenthBalance(calcText)}`;
        break;

      case "+/-":
        calcText = `${this.changeLastNumberSign(calcText)}`;
        break;

      case "x":
        calcText += "*";
        break;

      default:
        calcText += `${buttonText}`;
    }
    calcText = this.cleanText(calcText);
    this.setState({calcText: calcText});
  }

  evaluate = (expression) => {
    return `${math.eval(expression)}`;
  };

  checkParenthBalance = (text) => {
    if (/\(/.test(text)) {
      return `)`;
    } else {
      return `(`;
    }
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
    const lastOperandIndex = regexLastIndexOf(text, /[+\-*/]/) + 1;
    const lastNumber = parseInt(text.substring(lastOperandIndex));

    console.log(lastOperandIndex);
    return `${text.slice(0, lastOperandIndex)}(${lastNumber * -1})`;
  };

  render() {
    const buttons = basicButtons.map((btn) => {
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
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
        <div id="calculator">
          <Display calcText={this.state.calcText} />
          <div id="buttonGrid">{buttons}</div>
        </div>
        <Footer />
      </div>
    );
  }
}
