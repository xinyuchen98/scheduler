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

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "COMFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  const toConfirmDelete = function() {
    transition(CONFIRM);
  }

  const edit = function() {
    transition(EDIT);
  }

  const destroy = function() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
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