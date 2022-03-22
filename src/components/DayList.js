import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}  // Add unique keys for days
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value} // Check if the day is selected
        setDay={() => props.onChange(day.name)} // Function to change to another day
      />
    );
  });


  return (
    <ul>
      {days}
    </ul>);
}