import React from "react";

import "../css/Display.css";

export default function Display(props) {
  return (
    <div id="displayBox">
      <div id="display">{props.calcText}</div>
    </div>
  );
}
