import React from "react";

export const basicButtons = [
  {text: "C", displayText: "C", desc: "clear"},
  {text: "()", displayText: "()", desc: "parenth"},
  {text: "Adv", displayText: "Adv", desc: "advancedToggle"},
  {text: "/", displayText: "/", desc: "divide"},
  {text: "1", displayText: "1", desc: "one"},
  {text: "2", displayText: "2", desc: "two"},
  {text: "3", displayText: "3", desc: "three"},
  {text: " * ", displayText: "x", desc: "multiply"},
  {text: "4", displayText: "4", desc: "four"},
  {text: "5", displayText: "5", desc: "five"},
  {text: "6", displayText: "6", desc: "six"},
  {text: " - ", displayText: "-", desc: "subtract"},
  {text: "7", displayText: "7", desc: "seven"},
  {text: "8", displayText: "8", desc: "eight"},
  {text: "9", displayText: "9", desc: "nine"},
  {text: " + ", displayText: "+", desc: "add"},
  {text: "swap", displayText: "+/-", desc: "changeSign"},
  {text: "0", displayText: "0", desc: "zero"},
  {text: ".", displayText: ".", desc: "decimal"},
  {text: "=", displayText: "=", desc: "equals"}
];

export const advancedButtons = [
  {text: "sqrt", displayText: <span>&radic;</span>, desc: "SquareRoot"},
  {
    text: "exp",
    displayText: (
      <span>
        X<sup>y</sup>
      </span>
    ).props.children,
    desc: "exponent"
  },
  {text: "pi", displayText: <span>&pi;</span>, desc: "pi"},
  {text: "!", displayText: "!", desc: "factorial"},
  {text: "rev", displayText: "1/x", desc: "reverse"},
  {text: "abs", displayText: "|x|", desc: "absolute-value"},
  {text: "h ", displayText: "h", desc: "hours"},
  {text: "m ", displayText: "m", desc: "minutes"},
  {text: "s ", displayText: "s", desc: "seconds"},
  {
    text: "con",
    type: "H",
    displayText: (
      <span>
        <sup>=</sup>h
      </span>
    ).props.children,
    desc: "convertToHours"
  },
  {
    text: "con",
    type: "M",
    displayText: (
      <span>
        <sup>=</sup>m
      </span>
    ).props.children,
    desc: "convertToMinutes"
  },
  {
    text: "con",
    type: "S",
    displayText: (
      <span>
        <sup>=</sup>s
      </span>
    ).props.children,
    desc: "convertToSeconds"
  }
];
