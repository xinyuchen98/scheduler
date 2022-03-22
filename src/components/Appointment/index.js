import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";

// Appointment component
export default function Appointment(props) {
  // Preset modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "COMFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Get mode, transition and back functions from custom hook
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // Save the information with name and interviewer
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // Change to saving mode
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW)) // Change to show mode if successful
      .catch(() => transition(ERROR_SAVE, true)); // Change to error save mode if unsuccessful
  }

  // Ask the user to confirm
  const toConfirmDelete = function() {
    transition(CONFIRM);
  }

  // Edit an appointment
  const edit = function() {
    transition(EDIT);
  }

  // Delete an appointment
  const destroy = function() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY)) // Change to empty mode if successful
      .catch(() => transition(ERROR_DELETE, true)); // Change to error delete mode if unsuccessful
  }

  return (
    <article className="appointment">
      {/* Show header with time */}
      <Header time={props.time} />
      {/* Show content based on current mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={toConfirmDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onCancel={back} onConfirm={destroy} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={back} />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment. " onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment. " onClose={back} />}
    </article>
  );
}