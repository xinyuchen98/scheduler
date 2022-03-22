import React from "react";
import Button from "components/Button"

// Confirmation box
export default function Comfirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      {/* Message */}
      <h1 className="text--semi-bold">{props.message}</h1>
      {/* Buttons */}
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}