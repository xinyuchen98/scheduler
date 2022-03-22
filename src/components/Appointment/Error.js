import React from "react";

// Error box
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      {/* Error message */}
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      {/* Close button */}
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}