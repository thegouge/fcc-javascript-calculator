import React from "react";

import Button from "./Button";

import {advancedButtons} from "../assets/buttonBank";

import "../css/AdvancedPanel.css";

export default function AdvancedPanel(props) {
    const styleObject = {};
    const onMobile = document.documentElement.clientWidth < 1000;
    const scrollPositioning = (onMobile) ? "top" : "left";
    styleObject[scrollPositioning] = props.display ? (onMobile) ? "85%" : "68%" : "45.5%";
    const buttonElements = advancedButtons.map((btn) => {
      return (
        <Button
          key={btn.desc}
          description={btn.desc}
          text={btn.text}
          resolveButtonPress={props.resolveButtonPress}
        />
      );
    });

    return (
      <div
        id="advancedPanel"
        style={styleObject}
      >
        <div id="panelHeader">
          <h2>Advanced Buttons</h2>
        </div>
        <div id="advancedButtonGrid">{buttonElements}</div>
      </div>
    );
  }
