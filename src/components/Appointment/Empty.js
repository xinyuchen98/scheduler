import React from "react";

// Empty box
export default function Empty(props) {
  return (
    <main className="appointment__add">
      {/* Add button */}
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}