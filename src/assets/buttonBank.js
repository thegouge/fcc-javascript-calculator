import React from "react";

export const basicButtons = [
  {text: "C", desc: "clear"},
  {text: "()", desc: "parenth"},
  {text: "Adv", desc: "advancedToggle"},
  {text: "/", desc: "divide"},
  {text: "1", desc: "one"},
  {text: "2", desc: "two"},
  {text: "3", desc: "three"},
  {text: "x", desc: "multiply"},
  {text: "4", desc: "four"},
  {text: "5", desc: "five"},
  {text: "6", desc: "six"},
  {text: "-", desc: "subtract"},
  {text: "7", desc: "seven"},
  {text: "8", desc: "eight"},
  {text: "9", desc: "nine"},
  {text: "+", desc: "add"},
  {text: "+/-", desc: "changeSign"},
  {text: "0", desc: "zero"},
  {text: ".", desc: "decimal"},
  {text: "=", desc: "equals"}
];

export const advancedButtons = [
  {text: <span>&radic;</span>, desc: "SquareRoot"},
  {
    text: (
      <span>
        X<sup>y</sup>
      </span>
    ),
    desc: "exponent"
  },
  {text: <span>&pi;</span>, desc: "pi"},
  {text: "!", desc: "factorial"},
  {text: "1/x", desc: "reverse"},
  {text: "|x|", desc: "absolute-value"},
  {text: "h", desc: "hours"},
  {text: "m", desc: "minutes"},
  {text: "s", desc: "seconds"},
  {
    text: (
      <span>
        <sup>=</sup>h
      </span>
    ),
    desc: "convertToHours"
  },
  {
    text: (
      <span>
        <sup>=</sup>m
      </span>
    ),
    desc: "convertToMinutes"
  },
  {
    text: (
      <span>
        <sup>=</sup>s
      </span>
    ),
    desc: "convertToSeconds"
  }
];
