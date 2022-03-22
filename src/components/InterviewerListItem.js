import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // Add class names for different modes
  let interviewerListItemClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});
  
  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer} selected={props.selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      /> 
      {props.selected && props.name}
    </li>
  );
}