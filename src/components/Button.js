import React from "react";

import "../css/Button.css";

export default function Button(props) {
  return (
    <button
      className="calcButton"
      id={props.description}
      onClick={props.resolvePress(props.text)}
    >
      {props.text}
    </button>
  );
}
