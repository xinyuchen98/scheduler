import React from "react";

// Status box
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      {/* Message for different modes: Saving, Deleting */}
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}