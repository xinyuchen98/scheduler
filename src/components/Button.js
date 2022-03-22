import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  // Add class names for different modes
   let buttonClass = classNames("button", {"button--confirm": props.confirm, "button--danger": props.danger});
 
   return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
 }
