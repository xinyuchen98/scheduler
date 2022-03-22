import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  // Add class names for different modes
  let dayListItemClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": (props.spots === 0)});

  // Spots availble text on different situations
  const formatSpots = function(spots) {
    // Zero spots
    if (spots === 0) {
      return `no spots`;
    // One spot
    } else if (spots === 1) {
      return `1 spot`;
    // More than one spot
    } else {
      return `${spots} spots`;
    }
  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}