import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const formatAppointment = function(time) {
    if (!time) {
      return "No appointments";
    } else {
      return `Appointment at ${time}`;
    }
  }

  return (
    <article className="appointment">{formatAppointment(props.time)}</article>
  );
}