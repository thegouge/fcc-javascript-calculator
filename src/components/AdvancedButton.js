import React from "react";

export default function AdvancedButton(props) {
  return (
    <button className="calcButton" id="advancedToggle" onClick={props.toggle}>
      Adv
    </button>
  );
}
